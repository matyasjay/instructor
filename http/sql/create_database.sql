CREATE TABLE "User" (
  "id" String PRIMARY KEY,
  "name" String UNIQUE NOT NULL,
  "email" String UNIQUE NOT NULL,
  "password" String NOT NULL,
  "services" ServicesOnUsers NOT NULL,
  "createdAt" DateTime NOT NULL DEFAULT (now()),
  "updatedAt" DateTime NOT NULL DEFAULT (now())
);

CREATE TABLE "Service" (
  "id" String PRIMARY KEY,
  "name" String UNIQUE NOT NULL,
  "private" Boolean NOT NULL,
  "description" String,
  "users" ServicesOnUsers NOT NULL,
  "templates" TemplatesOnServices NOT NULL,
  "createdAt" DateTime NOT NULL DEFAULT (now()),
  "updatedAt" DateTime NOT NULL DEFAULT (now())
);

CREATE TABLE "Template" (
  "id" String PRIMARY KEY,
  "name" String UNIQUE NOT NULL,
  "description" String NOT NULL,
  "template" String NOT NULL,
  "services" TemplatesOnServices NOT NULL,
  "input" TemplateInput,
  "createdAt" DateTime NOT NULL DEFAULT (now()),
  "updatedAt" DateTime NOT NULL DEFAULT (now())
);

CREATE TABLE "TemplateInput" (
  "id" String PRIMARY KEY,
  "input" String,
  "template" Template NOT NULL,
  "templateId" String UNIQUE NOT NULL,
  "createdAt" DateTime NOT NULL DEFAULT (now()),
  "updatedAt" DateTime NOT NULL DEFAULT (now())
);

CREATE TABLE "ServicesOnUsers" (
  "user" User NOT NULL,
  "userId" String NOT NULL,
  "service" Service NOT NULL,
  "serviceId" String NOT NULL,
  PRIMARY KEY ("userId", "serviceId")
);

CREATE TABLE "TemplatesOnServices" (
  "template" Template NOT NULL,
  "templateId" String NOT NULL,
  "service" Service NOT NULL,
  "serviceId" String NOT NULL,
  PRIMARY KEY ("templateId", "serviceId")
);

ALTER TABLE "Template" ADD FOREIGN KEY ("id") REFERENCES "TemplateInput" ("templateId");

ALTER TABLE "ServicesOnUsers" ADD FOREIGN KEY ("userId") REFERENCES "User" ("id");

ALTER TABLE "ServicesOnUsers" ADD FOREIGN KEY ("serviceId") REFERENCES "Service" ("id");

ALTER TABLE "TemplatesOnServices" ADD FOREIGN KEY ("templateId") REFERENCES "Template" ("id");

ALTER TABLE "TemplatesOnServices" ADD FOREIGN KEY ("serviceId") REFERENCES "Service" ("id");
