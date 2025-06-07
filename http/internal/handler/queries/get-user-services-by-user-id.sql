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
      WHEN pt.id IS NOT NULL THEN json_build_object(
        'id', pt.id,
        'name', pt.name,
        'description', pt.description,
        'template', pt.template,
        'createdAt', pt."createdAt",
        'updatedAt', pt."updatedAt",
		'input', CASE
		  WHEN pi.id IS NOT NULL THEN jsonb_build_object(
		    'id', pi.id,
            'input', pi.input,
            'createdAt', pi."createdAt",
            'updatedAt', pi."updatedAt"
		  )
		  ELSE NULL
		END,
		'variable', CASE
		  WHEN pv.id IS NOT NULL THEN jsonb_build_object(
		    'id', pv.id,
            'variable', pv.variable,
            'createdAt', pv."createdAt",
            'updatedAt', pv."updatedAt"
		  )
		  ELSE NULL
		END
      )
    END
  ) FILTER (WHERE pt.id IS NOT NULL), '[]') AS templates,
  s."createdAt",
  s."updatedAt"

FROM instructor."User" u

JOIN instructor."ServicesOnUsers" su ON u.id = su."userId"
JOIN instructor."Service" s ON su."serviceId" = s.id

-- Join other user of the service
LEFT JOIN instructor."ServicesOnUsers" su2 ON su2."serviceId" = s.id
LEFT JOIN instructor."User" u2 ON su2."userId" = u2.id

-- Join templates and their inputs
LEFT JOIN instructor."TemplatesOnServices" ts ON s.id = ts."serviceId"
LEFT JOIN instructor."PromptTemplate" pt ON ts."templateId" = pt.id
LEFT JOIN instructor."PromptInput" pi ON pt.id = pi."templateId"
LEFT JOIN instructor."PromptVariable" pv ON pt.id = pv."templateId"

WHERE u."id" = $1

GROUP BY s.id;
