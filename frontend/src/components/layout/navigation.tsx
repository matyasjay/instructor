import { Fragment } from 'react';
import Cookies from 'js-cookie';
import z from 'zod/v4';
import AlertButton from '@/components/feature/alert-button';
import FormLayout from '@/components/layout/form';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { COOKIES, STORAGE } from '@/lib/cookies';
import { ENDPOINT } from '@/lib/endpoints';
import useAppNavigation from '@/lib/hooks/useAppNavigation';
import useAuth from '@/lib/hooks/useAuth';
import useLogout from '@/lib/hooks/useLogout';
import useUser from '@/lib/hooks/useUser';
import { PRIMARY_ROUTES } from '@/lib/menu';
import { PAGES } from '@/lib/pages';
import { REQUEST_KEY } from '@/lib/query';
import { authPost } from '@/lib/utils';

export const createUserForm: Form = {
  schema: z
    .object({
      email: z.email(),
      name: z.string().min(5, { error: 'Name must be at least five (5) characters long!' }).max(30, {
        error: 'Name cannot be more than thirty (30) characters long!',
      }),
      password: z.string().min(8, {
        error: 'Password must be at least eight (8) characters long!',
      }),
      password_confirm: z.string(),
    })
    .check((ctx) => {
      if (ctx.value.password_confirm !== ctx.value.password) {
        ctx.issues.push({
          code: 'custom',
          error: 'Password and confirmation must match!',
          input: ctx.value.password_confirm,
        });
      }
    }),
  fields: {
    email: {
      label: 'E-mail',
      type: 'email',
    },
    name: {
      label: 'Name',
      type: 'text',
    },
    password: {
      label: 'Password',
      type: 'password',
    },
    password_confirm: {
      label: 'Confirm',
      type: 'password',
    },
  },
};

export const loginUserForm: Form = {
  schema: z.object({
    email: z.email({ error: 'The e-mail address you entered is not valid!' }),
    password: z.string().min(8, {
      error: 'Password must be at least eight (8) characters long!',
    }),
  }),
  fields: {
    email: {
      type: 'email',
      label: 'E-mail',
    },
    password: {
      type: 'password',
      label: 'Password',
    },
  },
};

export default function Navigation() {
  const { authenticated, setAuthenticated } = useAuth();
  const user = useUser();
  const logout = useLogout();
  const { left, right, handleNavigate } = useAppNavigation();

  const handleAuthenticated = (result: ApiResponse<UserResponse>) => {
    if (!result.error && 'token' in result) {
      window.localStorage.setItem(STORAGE.USER, JSON.stringify(result.user));
      Cookies.set(COOKIES.JWT, result.token);
      setAuthenticated(true);
    }
  };

  const handleLogin = async (input: FormInput) => {
    const result = await authPost<PostUserInput, UserResponse>(ENDPOINT.USER_LOGIN, input as PostUserInput);
    handleAuthenticated(result);
    return result;
  };

  const handleSignup = async (input: FormInput) => {
    const result = await authPost<PostUserInput, UserResponse>(ENDPOINT.USER_CREATE, input as PostUserInput);
    handleAuthenticated(result);
    return result;
  };

  return (
    <nav className="h-[70px] fixed top-0 left-0 right-0 bg-sidebar flex items-center px-5 py-3 gap-3 max-w-[1400px] mx-auto border-x-1 z-50 shadow-md border-b-1">
      <Button
        className="text-lg hover:no-underline text-white cursor-pointer"
        variant="link"
        onClick={handleNavigate(PAGES.PUBLIC.LANDING)}
      >
        Instructor
      </Button>
      {authenticated ? (
        <Fragment>
          {left.map((page) => (
            <Button
              variant={PRIMARY_ROUTES.includes(page.id?.split('#')[0] ?? '') ? 'default' : 'ghost'}
              className="cursor-pointer rounded-none"
              onClick={handleNavigate(page.path + '')}
              key={page.id}
            >
              {page.id?.split('#')[1]}
            </Button>
          ))}
          <h3 id="account-details" className="flex flex-col items-end ml-auto text-gray-400">
            <span className="font-normal">{user.name}</span>
            <span className="text-gray-500 text-xs">{user.email}</span>
          </h3>
          <Separator orientation="vertical" />
          {right.map((page) => (
            <Button
              variant={PRIMARY_ROUTES.includes(page.id?.split('#')[0] ?? '') ? 'default' : 'ghost'}
              className="cursor-pointer rounded-none"
              onClick={handleNavigate(page.path + '')}
              key={page.id}
            >
              {page.id?.split('#')[1]}
            </Button>
          ))}
          <AlertButton
            title="Do you wish to sign out?"
            trigger="Log out"
            description="This action will sign you out from our systems and prevent accessing your data from our servers."
            triggerVariant="outline"
            dismiss="split"
            confirm="Confirm"
            onConfirm={logout}
            confirmVariant="destructive"
          />
        </Fragment>
      ) : (
        <Fragment>
          <AlertButton
            title="Sign In"
            trigger="Sign In"
            content={
              <FormLayout mutationKey={REQUEST_KEY[ENDPOINT.USER_LOGIN]} form={loginUserForm} onSubmit={handleLogin} />
            }
            description="Fill in your credentials to log in to your account."
            className="ml-auto"
          />
          <AlertButton
            triggerVariant="outline"
            title="Sign Up"
            trigger="Sign Up"
            description="Fill in your details below to create a new account."
            content={
              <FormLayout
                mutationKey={REQUEST_KEY[ENDPOINT.USER_CREATE]}
                form={createUserForm}
                onSubmit={handleSignup}
              />
            }
          />
        </Fragment>
      )}
    </nav>
  );
}
