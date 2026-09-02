import { useState } from 'react'
import {
  emptyStyleFilters,
  getFilterLabels,
  hairLengthOptions,
  hasActiveStyleFilters,
  styleOptions,
} from '../data/styleFilters'
import { handleHashLinkClick } from '../scrollToHash'

const MODE_CHIPS = 'chips'
const MODE_QUIZ = 'quiz'

const quizSteps = [
  {
    key: 'hairLengths',
    question: '지금 머리 기장은 어떤가요?',
    hint: '현재 기장에 잘 어울리는 시술만 남겨 드릴게요.',
    options: hairLengthOptions,
    skipLabel: '기장은 상관없어요',
  },
  {
    key: 'styles',
    question: '어떤 스타일을 원하세요?',
    hint: '원하는 시술 방향을 고르면 포트폴리오가 바로 좁혀집니다.',
    options: styleOptions,
    skipLabel: '아직 잘 모르겠어요',
  },
]

function StyleFinder({ filters, onChange, matchCount }) {
  const [mode, setMode] = useState(MODE_CHIPS)
  const [quizStep, setQuizStep] = useState(0)
  const active = hasActiveStyleFilters(filters)
  const labels = getFilterLabels(filters)
  const currentQuiz = quizSteps[quizStep]
  const isLastQuizStep = quizStep === quizSteps.length - 1

  function setFilterGroup(key, ids) {
    onChange({ ...filters, [key]: ids })
  }

  function toggleChip(key, id) {
    const current = filters[key]
    const next = current.includes(id)
      ? current.filter((value) => value !== id)
      : [...current, id]
    setFilterGroup(key, next)
  }

  function chooseQuizAnswer(id) {
    setFilterGroup(currentQuiz.key, [id])
  }

  function skipQuizAnswer() {
    setFilterGroup(currentQuiz.key, [])
  }

  function resetFilters() {
    onChange(emptyStyleFilters)
    setQuizStep(0)
  }

  return (
    <section id="style-finder" className="style-finder">
      <div className="container">
        <div className="style-finder-header">
          <div>
            <p className="eyebrow">Find your style</p>
            <h2 className="section-title">나에게 맞는 스타일 찾기</h2>
            <p className="section-description">
              기장과 원하는 시술을 고르면, 아래에서 받을 수 있는 스타일만
              보여 드립니다. 칩으로 바로 고르거나, 질문에 답하며 찾아 보세요.
            </p>
          </div>

          <div className="style-finder-modes" role="tablist" aria-label="찾기 방식">
            <button
              type="button"
              role="tab"
              aria-selected={mode === MODE_CHIPS}
              className={mode === MODE_CHIPS ? 'is-active' : ''}
              onClick={() => setMode(MODE_CHIPS)}
            >
              칩으로 고르기
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === MODE_QUIZ}
              className={mode === MODE_QUIZ ? 'is-active' : ''}
              onClick={() => {
                setMode(MODE_QUIZ)
                setQuizStep(0)
              }}
            >
              질문으로 찾기
            </button>
          </div>
        </div>

        {mode === MODE_CHIPS ? (
          <div className="style-filter-panel">
            <FilterChipGroup
              title="지금 기장"
              options={hairLengthOptions}
              selectedIds={filters.hairLengths}
              onToggle={(id) => toggleChip('hairLengths', id)}
            />
            <FilterChipGroup
              title="원하는 시술"
              options={styleOptions}
              selectedIds={filters.styles}
              onToggle={(id) => toggleChip('styles', id)}
            />
          </div>
        ) : (
          <div className="style-quiz">
            <div className="style-quiz-progress" aria-hidden="true">
              {quizSteps.map((step, index) => (
                <span
                  key={step.key}
                  className={`style-quiz-dot${index <= quizStep ? ' is-active' : ''}`}
                />
              ))}
            </div>
            <p className="style-quiz-step">
              질문 {quizStep + 1} / {quizSteps.length}
            </p>
            <h3 className="style-quiz-question">{currentQuiz.question}</h3>
            <p className="style-quiz-hint">{currentQuiz.hint}</p>

            <div className="style-quiz-options">
              {currentQuiz.options.map((option) => {
                const selected = filters[currentQuiz.key].includes(option.id)
                return (
                  <button
                    key={option.id}
                    type="button"
                    className={`style-quiz-option${selected ? ' is-selected' : ''}`}
                    aria-pressed={selected}
                    onClick={() => chooseQuizAnswer(option.id)}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>

            <div className="style-quiz-actions">
              <button
                type="button"
                className="button button-ghost button-small"
                onClick={skipQuizAnswer}
              >
                {currentQuiz.skipLabel}
              </button>
              {quizStep > 0 && (
                <button
                  type="button"
                  className="button button-ghost button-small"
                  onClick={() => setQuizStep((step) => step - 1)}
                >
                  이전 질문
                </button>
              )}
              {isLastQuizStep ? (
                <a
                  href="#portfolio"
                  className="button button-primary button-small"
                  onClick={handleHashLinkClick}
                >
                  맞는 스타일 {matchCount}개 보기
                </a>
              ) : (
                <button
                  type="button"
                  className="button button-primary button-small"
                  onClick={() => setQuizStep((step) => step + 1)}
                >
                  다음 질문
                </button>
              )}
            </div>
          </div>
        )}

        <div className="style-finder-summary">
          <p>
            {active
              ? `${labels.join(' · ')} 기준으로 ${matchCount}개의 스타일을 찾았습니다.`
              : `조건을 고르면 시술 스타일 ${matchCount}개 중에서 골라 드립니다.`}
          </p>
          {active && (
            <button type="button" className="style-finder-reset" onClick={resetFilters}>
              필터 초기화
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

function FilterChipGroup({ title, options, selectedIds, onToggle }) {
  return (
    <fieldset className="filter-chip-group">
      <legend>{title}</legend>
      <div className="filter-chip-row">
        {options.map((option) => {
          const selected = selectedIds.includes(option.id)
          return (
            <button
              key={option.id}
              type="button"
              className={`filter-chip${selected ? ' is-selected' : ''}`}
              aria-pressed={selected}
              onClick={() => onToggle(option.id)}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

export default StyleFinder
