if [ -n "$__CONFIG_SH_INCLUDED__" ]; then
  return
fi
__CONFIG_SH_INCLUDED__=true

# -- Colours and styles
NO_FORMAT="\033[0m"
F_BOLD="\033[1m"
F_DIM="\033[2m"
C_INDIANRED1="\033[38;5;203m"
C_SEAGREEN2="\033[38;5;83m"
C_GREY46="\033[38;5;243m"
C_GREY62="\033[38;5;247m"

# -- Project defaults
PROJECT="instructor"
VERSION=$(node -p "require('./package.json').version")

# -- Go build configuration
CGO_ENABLED=0
GOOS=linux
