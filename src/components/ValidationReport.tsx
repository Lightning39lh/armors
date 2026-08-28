import {
  INFRACTION_SEVERITY_LABEL,
  VALIDATION_STATUS,
  type ValidationIssue,
} from "../domain/buhurt-rules";

interface ValidationReportProps {
  issues: ValidationIssue[];
}

export function ValidationReport({ issues }: ValidationReportProps) {
  const failures = issues.filter((issue) => issue.status === VALIDATION_STATUS.FAIL);
  const warnings = issues.filter(
    (issue) => issue.status !== VALIDATION_STATUS.FAIL,
  );

  return (
    <section className="validation-report card" aria-label="Reporte de reglas">
      <div className="panel-heading compact">
        <div>
          <p className="eyebrow">Compatibilidad oficial</p>
          <h2>Reporte de revisión</h2>
        </div>
      </div>

      <div className="catalog-summary">
        <strong>{failures.length}</strong> bloqueantes ·{" "}
        <strong>{warnings.length}</strong> advertencias/revisión manual
      </div>

      {issues.length === 0 ? (
        <div className="empty-catalog compact">
          Sin problemas detectados por las reglas cargadas. Igual requiere revisión
          real si se va a usar en torneo.
        </div>
      ) : (
        <div className="issue-list">
          {issues.map((issue) => (
            <article className={`issue-card ${issue.status}`} key={issue.id}>
              <span className="part-badge">
                {INFRACTION_SEVERITY_LABEL[issue.severity]}
              </span>
              <h3>{issue.title}</h3>
              <p>{issue.description}</p>
              <a href={issue.evidence.sourceUrl} rel="noreferrer" target="_blank">
                Fuente: {issue.evidence.documentName}
              </a>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
