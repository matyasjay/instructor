SELECT
  s.id,
  s.name,
  s.private,
  s.description,

  json_agg(
    DISTINCT jsonb_build_object(
      'id', u2.id,
      'name', u2.name,
      'email', u2.email,
      'createdAt', u2."createdAt",
      'updatedAt', u2."updatedAt"
    )
  ) FILTER (WHERE u2.id IS NOT NULL) AS users,

  COALESCE(json_agg(
    CASE
      WHEN t.id IS NOT NULL THEN json_build_object(
        'id', t.id,
        'name', t.name,
        'description', t.description,
        'template', t."template",
        'createdAt', t."createdAt",
        'updatedAt', t."updatedAt",
        'input', CASE
          WHEN i.id IS NOT NULL THEN jsonb_build_object(
            'id', i.id,
                'input', i."input",
                'createdAt', i."createdAt",
                'updatedAt', i."updatedAt"
          )
          ELSE NULL
        END
      )
    END
  ) FILTER (WHERE t.id IS NOT NULL), '[]') AS templates,
  s."createdAt",
  s."updatedAt"

FROM instructor."User" u

JOIN instructor."ServicesOnUsers" su ON u.id = su."userId"
JOIN instructor."Service" s ON su."serviceId" = s.id

LEFT JOIN instructor."ServicesOnUsers" serviceOnUsers ON serviceOnUsers."serviceId" = s.id
LEFT JOIN instructor."User" u2 ON serviceOnUsers."userId" = u2.id

LEFT JOIN instructor."TemplatesOnServices" ts ON s.id = ts."serviceId"
LEFT JOIN instructor."Template" t ON ts."templateId" = t.id

LEFT JOIN instructor."InputsOnTemplates" it ON t.id = it."templateId"
LEFT JOIN instructor."Input" i ON it."templateId" = i."templateId"
