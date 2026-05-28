'use client';

import Link from 'next/link';
import { useState } from 'react';
import type {
  TopicDefinition,
  TopicMilestone,
  TopicCompanyGuide,
} from '@/lib/topics';

function humanizeCategory(cat: string): string {
  return cat.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function jurisdictionBadge(j: string): string {
  if (j === 'eu') return 'EU';
  if (j === 'us_federal') return 'US';
  return 'EU / US';
}

function milestoneTypeColor(type: TopicMilestone['type']): string {
  const map: Record<string, string> = {
    adopted: '#16a34a',
    enforced: '#e63312',
    amendment: '#2563eb',
    court_ruling: '#d97706',
    enforcement: '#db2777',
    deadline: '#6b7280',
  };
  return map[type] || '#6b7280';
}

function milestoneTypeLabel(type: TopicMilestone['type']): string {
  const map: Record<string, string> = {
    adopted: 'ADOPTED',
    enforced: 'IN FORCE',
    amendment: 'AMENDMENT',
    court_ruling: 'COURT RULING',
    enforcement: 'ENFORCEMENT',
    deadline: 'DEADLINE',
  };
  return map[type] || type.toUpperCase();
}

function riskLevelColor(level: TopicCompanyGuide['riskLevel']): string {
  const map: Record<string, string> = {
    low: '#16a34a',
    medium: '#d97706',
    high: '#e63312',
    critical: '#7f1d1d',
  };
  return map[level] || '#6b7280';
}

function riskLevelLabel(level: TopicCompanyGuide['riskLevel']): string {
  const map: Record<string, string> = {
    low: 'LOW RISK',
    medium: 'MEDIUM RISK',
    high: 'HIGH RISK',
    critical: 'CRITICAL',
  };
  return map[level] || level.toUpperCase();
}

function companyIcon(icon: TopicCompanyGuide['icon']): string {
  const map: Record<string, string> = {
    tech: '⚙',
    factory: '⏣',
    finance: '☖',
    retail: '⚛',
    healthcare: '⚕',
    energy: '⚡',
    logistics: '✈',
    agriculture: '☘',
    construction: '⌂',
    general: '○',
  };
  return map[icon] || '○';
}

function formatMilestoneDate(d: string): string {
  return new Date(d).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

interface Props {
  topic: TopicDefinition;
  relatedTopics: TopicDefinition[];
}

export function TopicPageClient({ topic, relatedTopics }: Props) {
  const [expandedGuide, setExpandedGuide] = useState<number | null>(0);
  const [expandedInterpretations, setExpandedInterpretations] = useState<Set<number>>(new Set());
  const [expandedMilestones, setExpandedMilestones] = useState<Set<number>>(new Set());

  const todayStr = new Date().toISOString().split('T')[0] as string;

  const youAreHereIndex = (() => {
    if (!topic.milestones?.length) return -1;
    for (let i = 0; i < topic.milestones.length; i++) {
      if (topic.milestones[i]!.date > todayStr) return i;
    }
    return topic.milestones.length;
  })();

  function toggleGuide(i: number) {
    setExpandedGuide(expandedGuide === i ? null : i);
  }

  function toggleInterpretation(i: number) {
    const s = new Set(expandedInterpretations);
    if (s.has(i)) s.delete(i);
    else s.add(i);
    setExpandedInterpretations(s);
  }

  function toggleMilestone(i: number) {
    const s = new Set(expandedMilestones);
    if (s.has(i)) s.delete(i);
    else s.add(i);
    setExpandedMilestones(s);
  }

  return (
    <div style={s.page}>
      {/* 1. Hero */}
      <div style={s.hero}>
        <div style={s.heroKicker}>
          <Link href="/topics" style={s.heroKickerLink}>TOPICS</Link>
          <span style={s.heroKickerSep}>&middot;</span>
          <span>{humanizeCategory(topic.category).toUpperCase()}</span>
        </div>
        <h1 style={s.heroTitle}>{topic.title}</h1>
        <p style={s.heroTagline}>{topic.description}</p>
        <div style={s.heroMeta}>
          <span style={s.heroBadge}>{jurisdictionBadge(topic.jurisdiction)}</span>
          <span style={s.heroUpdated}>Updated May 2026</span>
        </div>
      </div>

      {/* 2. In a nutshell */}
      {topic.nutshell?.length ? (
        <div style={s.nutshell}>
          <div style={s.nutshellHeader}>
            <div style={s.sectionLabel}>IN A NUTSHELL</div>
          </div>
          <div style={s.nutshellGrid}>
            {topic.nutshell.map((item, i) => {
              const colonIdx = item.indexOf(': ');
              const label = colonIdx > -1 ? item.slice(0, colonIdx) : '';
              const text = colonIdx > -1 ? item.slice(colonIdx + 2) : item;
              return (
                <div key={i} style={{ ...s.nutshellItem, ...(i % 2 === 0 ? s.nutshellItemOdd : {}) }}>
                  {label && <div style={s.nutshellItemLabel}>{label}</div>}
                  <div style={s.nutshellItemText}>{text}</div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Editorial overview */}
      {topic.editorial ? (
        <div style={{ ...s.section, ...s.editorialSection }}>
          <div style={s.sectionLabel}>OVERVIEW</div>
          {topic.editorial.split('\n\n').map((para, i) => (
            <p key={i} style={s.editorialPara}>{para}</p>
          ))}
        </div>
      ) : null}

      {/* 3. Milestones */}
      {topic.milestones?.length ? (
        <div style={{ ...s.section, ...s.milestoneSection }}>
          <div style={s.sectionLabel}>KEY MILESTONES</div>
          <div style={s.milestoneTimeline}>
            <div style={s.milestoneTimelineLine} />
            {topic.milestones.map((m, i) => (
              <div key={i}>
                {youAreHereIndex === i && (
                  <div style={s.milestone}>
                    <div style={s.milestoneDate}>{formatMilestoneDate(todayStr)}</div>
                    <div style={{ ...s.milestoneDot, ...s.milestoneDotToday }} />
                    <div style={s.milestoneContent}>
                      <span style={{ ...s.milestoneType, color: 'var(--accent)' }}>YOU ARE HERE</span>
                    </div>
                  </div>
                )}
                <button
                  style={{
                    ...s.milestone,
                    ...s.milestoneBtn,
                    opacity: m.date > todayStr ? 0.6 : 1,
                  }}
                  onClick={() => toggleMilestone(i)}
                >
                  <div style={s.milestoneDate}>{formatMilestoneDate(m.date)}</div>
                  <div style={{ ...s.milestoneDot, backgroundColor: milestoneTypeColor(m.type) }} />
                  <div style={s.milestoneContent}>
                    <span style={{ ...s.milestoneType, color: milestoneTypeColor(m.type) }}>
                      {milestoneTypeLabel(m.type)}
                    </span>
                    <span style={s.milestoneEvent}>{m.event}</span>
                    {expandedMilestones.has(i) && (
                      <div style={s.milestoneDetail}>
                        <span style={s.milestoneDetailDate}>{formatMilestoneDate(m.date)}</span>
                        <span>
                          {m.date <= todayStr
                            ? 'This milestone has passed.'
                            : 'This milestone is upcoming.'}
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              </div>
            ))}
            {youAreHereIndex === topic.milestones.length && (
              <div style={s.milestone}>
                <div style={s.milestoneDate}>{formatMilestoneDate(todayStr)}</div>
                <div style={{ ...s.milestoneDot, ...s.milestoneDotToday }} />
                <div style={s.milestoneContent}>
                  <span style={{ ...s.milestoneType, color: 'var(--accent)' }}>YOU ARE HERE</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}

      {/* 4. Company guides */}
      {topic.companyGuides?.length ? (
        <div style={s.section}>
          <div style={s.sectionLabel}>WHO DOES THIS AFFECT?</div>
          <p style={s.sectionSubtitle}>Select your company type for tailored compliance guidance.</p>
          <div style={s.companyGuides}>
            {topic.companyGuides.map((guide, i) => (
              <div key={i} style={s.guideCard}>
                <button style={s.guideCardHeader} onClick={() => toggleGuide(i)}>
                  <div style={s.guideCardTitleRow}>
                    <span style={s.guideCardIcon}>{companyIcon(guide.icon)}</span>
                    <span style={s.guideCardName}>{guide.companyType}</span>
                    <span
                      style={{
                        ...s.guideCardRisk,
                        color: riskLevelColor(guide.riskLevel),
                        borderColor: riskLevelColor(guide.riskLevel),
                      }}
                    >
                      {riskLevelLabel(guide.riskLevel)}
                    </span>
                  </div>
                  <span style={s.guideCardToggle}>{expandedGuide === i ? '−' : '+'}</span>
                </button>
                {expandedGuide === i && (
                  <div style={s.guideCardBody}>
                    <div style={s.guideCardObligations}>
                      <div style={s.guideCardObligationsLabel}>KEY OBLIGATIONS</div>
                      {guide.obligations.map((ob, j) => (
                        <div key={j} style={s.guideCardObligation}>
                          <span style={s.guideCardCheckbox}>&#9744;</span>
                          <span>{ob}</span>
                        </div>
                      ))}
                    </div>
                    <div style={s.guideCardFirstStep}>
                      <div style={s.guideCardFirstStepLabel}>YOUR FIRST STEP</div>
                      <p style={s.guideCardFirstStepText}>{guide.firstStep}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* 5. Key Requirements */}
      {topic.keyRequirements?.length ? (
        <div style={s.section}>
          <div style={s.sectionLabel}>KEY COMPLIANCE REQUIREMENTS</div>
          <div style={s.requirements}>
            {topic.keyRequirements.map((req, i) => (
              <div
                key={i}
                style={{
                  ...s.requirement,
                  ...(i === 0 ? s.requirementFirst : {}),
                  ...(i === topic.keyRequirements!.length - 1 ? s.requirementLast : {}),
                }}
              >
                <div style={s.requirementNumber}>{String(i + 1).padStart(2, '0')}</div>
                <div style={s.requirementContent}>
                  <div style={s.requirementTitle}>{req.title}</div>
                  <div style={s.requirementDesc}>{req.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* 6. Interpretations / FAQ */}
      {topic.interpretations?.length ? (
        <div style={s.section}>
          <div style={s.sectionLabel}>KEY INTERPRETATIONS &amp; FAQ</div>
          <div style={s.interpretations}>
            {topic.interpretations.map((interp, i) => (
              <div key={i} style={s.interpCard}>
                <button
                  style={s.interpQuestion}
                  onClick={() => toggleInterpretation(i)}
                >
                  <span style={s.interpQText}>{interp.question}</span>
                  <span style={s.interpToggle}>
                    {expandedInterpretations.has(i) ? '−' : '+'}
                  </span>
                </button>
                {expandedInterpretations.has(i) && (
                  <div style={s.interpBody}>
                    <p style={s.interpAnswer}>{interp.answer}</p>
                    <div style={s.interpSource}>
                      <span style={s.interpSourceLabel}>SOURCE:</span>
                      <span>{interp.source}</span>
                    </div>
                    <div style={s.interpImplication}>
                      <div style={s.interpImplicationLabel}>PRACTICAL IMPLICATION</div>
                      <p style={s.interpImplicationText}>{interp.implication}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* 7. Related Topics */}
      {relatedTopics.length > 0 && (
        <div style={s.section}>
          <div style={s.sectionLabel}>RELATED TOPICS</div>
          <div style={s.relatedTopicsRow}>
            {relatedTopics.map((rt) => (
              <Link
                key={rt.slug}
                href={`/topics/${rt.slug}`}
                style={s.relatedTopicChip}
              >
                <span style={s.relatedTopicChipTitle}>{rt.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back link */}
      <div style={s.backWrap}>
        <Link href="/topics" style={s.backLink}>
          &larr; ALL TOPICS
        </Link>
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: 1100,
    margin: '0 auto',
    padding: '2rem 1.5rem 3rem',
  },

  /* Hero */
  hero: {
    marginBottom: '2.5rem',
    paddingBottom: '2rem',
    borderBottom: '2px solid var(--border-strong)',
  },
  heroKicker: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '2px',
    color: 'var(--accent)',
    marginBottom: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  heroKickerLink: {
    color: 'var(--accent)',
    textDecoration: 'none',
  },
  heroKickerSep: { color: 'var(--text-dim)' },
  heroTitle: {
    fontSize: '2.75rem',
    fontWeight: 700,
    margin: '0 0 0.75rem',
    letterSpacing: '-2px',
    lineHeight: 1.1,
    maxWidth: 900,
  },
  heroTagline: {
    fontSize: '1.1rem',
    color: 'var(--text-muted)',
    lineHeight: 1.6,
    margin: '0 0 1rem',
    maxWidth: 750,
  },
  heroMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap' as React.CSSProperties['flexWrap'],
  },
  heroBadge: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '1.5px',
    padding: '0.2rem 0.6rem',
    border: '1px solid var(--border-strong)',
  },
  heroUpdated: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '0.5px',
    color: 'var(--text-dim)',
  },

  /* Nutshell */
  nutshell: {
    marginBottom: '2.5rem',
    border: '1px solid var(--border-strong)',
    background: 'rgba(230,51,18,0.02)',
  },
  nutshellHeader: { padding: '0.75rem 1rem 0' },
  nutshellGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 0,
  },
  nutshellItem: {
    padding: '0.85rem 1rem',
    borderTop: '1px solid var(--border)',
  },
  nutshellItemOdd: {
    borderRight: '1px solid var(--border)',
  },
  nutshellItemLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: 9,
    letterSpacing: '2px',
    fontWeight: 700,
    color: 'var(--accent)',
    marginBottom: '0.3rem',
    textTransform: 'uppercase' as React.CSSProperties['textTransform'],
  },
  nutshellItemText: {
    fontSize: '0.88rem',
    lineHeight: 1.55,
    color: 'var(--text)',
  },

  /* Section */
  section: { marginBottom: '2.5rem' },
  sectionLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '1.5px',
    color: 'var(--text-dim)',
    marginBottom: '0.75rem',
  },
  sectionSubtitle: {
    fontSize: '0.88rem',
    color: 'var(--text-muted)',
    margin: '-0.5rem 0 1rem',
    lineHeight: 1.5,
  },

  /* Editorial */
  editorialSection: {
    borderBottom: '1px solid var(--border)',
    paddingBottom: '2rem',
  },
  editorialPara: {
    fontSize: '0.95rem',
    lineHeight: 1.75,
    color: 'var(--text)',
    margin: '0 0 1.25rem',
    maxWidth: 750,
  },

  /* Milestone Timeline */
  milestoneSection: {
    borderBottom: '1px solid var(--border)',
    paddingBottom: '2rem',
  },
  milestoneTimeline: {
    position: 'relative',
    paddingLeft: 140,
  },
  milestoneTimelineLine: {
    position: 'absolute',
    left: 135,
    top: 4,
    bottom: 4,
    width: 1,
    background: 'var(--border-strong)',
  },
  milestone: {
    display: 'flex',
    alignItems: 'flex-start',
    position: 'relative',
    marginBottom: '1.25rem',
    width: '100%',
  },
  milestoneBtn: {
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textAlign: 'left' as React.CSSProperties['textAlign'],
    color: 'var(--text)',
    padding: 0,
  },
  milestoneDate: {
    position: 'absolute',
    left: -140,
    width: 125,
    textAlign: 'right' as React.CSSProperties['textAlign'],
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '0.5px',
    color: 'var(--text-muted)',
    paddingTop: 2,
    whiteSpace: 'nowrap' as React.CSSProperties['whiteSpace'],
  },
  milestoneDot: {
    position: 'absolute',
    left: -5,
    top: 4,
    width: 9,
    height: 9,
    flexShrink: 0,
  },
  milestoneDotToday: {
    width: 11,
    height: 11,
    left: -6,
    top: 3,
    background: 'var(--accent)',
    outline: '2px solid var(--bg)',
    boxShadow: '0 0 0 3px var(--accent)',
  },
  milestoneContent: {
    paddingLeft: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  milestoneType: {
    fontFamily: 'var(--font-mono)',
    fontSize: 9,
    letterSpacing: '1.5px',
    fontWeight: 700,
  },
  milestoneEvent: {
    fontSize: '0.85rem',
    lineHeight: 1.45,
    color: 'var(--text)',
  },
  milestoneDetail: {
    marginTop: '0.35rem',
    padding: '0.4rem 0.5rem',
    borderLeft: '2px solid var(--border-strong)',
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '0.5px',
    color: 'var(--text-dim)',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  milestoneDetailDate: {},

  /* Company Guides */
  companyGuides: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
  },
  guideCard: {
    border: '1px solid var(--border-strong)',
    background: 'var(--bg)',
  },
  guideCardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '0.75rem 0.85rem',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textAlign: 'left' as React.CSSProperties['textAlign'],
    color: 'var(--text)',
  },
  guideCardTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  guideCardIcon: {
    fontSize: '1.1rem',
    width: '1.5rem',
    textAlign: 'center' as React.CSSProperties['textAlign'],
    flexShrink: 0,
    color: 'var(--text-muted)',
  },
  guideCardName: {
    fontSize: '0.88rem',
    fontWeight: 600,
    letterSpacing: '-0.2px',
  },
  guideCardRisk: {
    fontFamily: 'var(--font-mono)',
    fontSize: 9,
    letterSpacing: '1.5px',
    fontWeight: 700,
    padding: '0.1rem 0.35rem',
    border: '1px solid',
  },
  guideCardToggle: {
    fontSize: '1.1rem',
    fontWeight: 300,
    color: 'var(--text-muted)',
    flexShrink: 0,
    width: '1.25rem',
    textAlign: 'center' as React.CSSProperties['textAlign'],
  },
  guideCardBody: {
    padding: '0 0.85rem 0.85rem',
    borderTop: '1px solid var(--border)',
  },
  guideCardObligations: { marginTop: '0.75rem' },
  guideCardObligationsLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: 9,
    letterSpacing: '1.5px',
    color: 'var(--text-dim)',
    marginBottom: '0.4rem',
  },
  guideCardObligation: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.5rem',
    fontSize: '0.85rem',
    lineHeight: 1.45,
    marginBottom: '0.35rem',
    color: 'var(--text)',
  },
  guideCardCheckbox: {
    flexShrink: 0,
    fontSize: '0.9rem',
    lineHeight: 1.3,
    color: 'var(--text-dim)',
  },
  guideCardFirstStep: {
    marginTop: '0.75rem',
    padding: '0.65rem 0.75rem',
    border: '1px solid var(--accent)',
    background: 'rgba(230,51,18,0.04)',
  },
  guideCardFirstStepLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: 9,
    letterSpacing: '1.5px',
    color: 'var(--accent)',
    fontWeight: 700,
    marginBottom: '0.3rem',
  },
  guideCardFirstStepText: {
    fontSize: '0.85rem',
    lineHeight: 1.5,
    color: 'var(--text)',
    margin: 0,
  },

  /* Key Requirements */
  requirements: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
  },
  requirement: {
    display: 'flex',
    gap: '1rem',
    padding: '0.85rem 0',
    borderBottom: '1px solid var(--border)',
  },
  requirementFirst: {
    borderTop: '1px solid var(--border-strong)',
  },
  requirementLast: {
    borderBottom: '1px solid var(--border-strong)',
  },
  requirementNumber: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    fontWeight: 700,
    color: 'var(--accent)',
    letterSpacing: '0.5px',
    minWidth: '1.75rem',
    paddingTop: 1,
  },
  requirementContent: { flex: 1 },
  requirementTitle: {
    fontSize: '0.9rem',
    fontWeight: 600,
    letterSpacing: '-0.2px',
    marginBottom: '0.2rem',
  },
  requirementDesc: {
    fontSize: '0.85rem',
    lineHeight: 1.55,
    color: 'var(--text-muted)',
  },

  /* Interpretations */
  interpretations: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
  },
  interpCard: {
    border: '1px solid var(--border-strong)',
    background: 'var(--bg)',
  },
  interpQuestion: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    padding: '0.75rem 0.85rem',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textAlign: 'left' as React.CSSProperties['textAlign'],
    color: 'var(--text)',
    gap: '0.75rem',
  },
  interpQText: {
    fontSize: '0.88rem',
    fontWeight: 600,
    letterSpacing: '-0.2px',
    lineHeight: 1.4,
  },
  interpToggle: {
    fontSize: '1.1rem',
    fontWeight: 300,
    color: 'var(--text-muted)',
    flexShrink: 0,
    width: '1.25rem',
    textAlign: 'center' as React.CSSProperties['textAlign'],
    paddingTop: 1,
  },
  interpBody: {
    padding: '0 0.85rem 0.85rem',
    borderTop: '1px solid var(--border)',
  },
  interpAnswer: {
    fontSize: '0.85rem',
    lineHeight: 1.65,
    color: 'var(--text)',
    margin: '0.75rem 0 0',
    maxWidth: 750,
  },
  interpSource: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '0.4rem',
    marginTop: '0.6rem',
    fontSize: '0.78rem',
    color: 'var(--text-muted)',
  },
  interpSourceLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: 9,
    letterSpacing: '1.5px',
    fontWeight: 700,
    color: 'var(--text-dim)',
    flexShrink: 0,
  },
  interpImplication: {
    marginTop: '0.75rem',
    padding: '0.65rem 0.75rem',
    border: '1px solid var(--accent)',
    background: 'rgba(230,51,18,0.04)',
  },
  interpImplicationLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: 9,
    letterSpacing: '1.5px',
    color: 'var(--accent)',
    fontWeight: 700,
    marginBottom: '0.3rem',
  },
  interpImplicationText: {
    fontSize: '0.85rem',
    lineHeight: 1.5,
    color: 'var(--text)',
    margin: 0,
  },

  /* Related Topics */
  relatedTopicsRow: {
    display: 'flex',
    gap: '0.35rem',
    flexWrap: 'wrap' as React.CSSProperties['flexWrap'],
  },
  relatedTopicChip: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.35rem 0.65rem',
    border: '1px solid var(--border-strong)',
    background: 'var(--bg)',
    textDecoration: 'none',
    color: 'var(--text)',
    transition: 'background 0.15s',
  },
  relatedTopicChipTitle: {
    fontSize: '0.8rem',
    fontWeight: 500,
    letterSpacing: '-0.1px',
  },

  /* Back link */
  backWrap: {
    marginTop: '2rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid var(--border)',
  },
  backLink: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '1.5px',
    color: 'var(--accent)',
    textDecoration: 'none',
  },
};
