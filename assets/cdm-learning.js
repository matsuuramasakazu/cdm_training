/**
 * FINOS CDM Training Workspace — Shared Interactive Components
 * Provides:
 *  1. Top-Down Hierarchy & .rosetta Primary Source Explorer
 *  2. Interactive Data-to-CDM Mapping Challenge with immediate feedback
 *  3. Retrieval Practice 4-Choice Quiz with immediate feedback
 *  4. Glossary live search filter
 */

document.addEventListener("DOMContentLoaded", () => {
  initHierarchyExplorers();
  initMappingChallenges();
  initQuizzes();
  initGlossaryFilter();
});

/**
 * 1. Interactive Top-Down Hierarchy Explorer
 */
function initHierarchyExplorers() {
  const explorers = document.querySelectorAll("[data-component='hierarchy-explorer']");
  explorers.forEach((explorer) => {
    const nodeBtns = explorer.querySelectorAll(".tree-node-btn");
    const tabBtns = explorer.querySelectorAll(".detail-tab-btn");
    const detailCards = explorer.querySelectorAll(".node-detail-card");

    // Node selection
    nodeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-node");
        nodeBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        detailCards.forEach((card) => {
          if (card.getAttribute("data-node-content") === targetId) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      });
    });

    // Tab switching inside detail view
    tabBtns.forEach((tabBtn) => {
      tabBtn.addEventListener("click", () => {
        const targetTab = tabBtn.getAttribute("data-tab");
        tabBtns.forEach((b) => b.classList.remove("active"));
        tabBtn.classList.add("active");

        const panes = explorer.querySelectorAll(".detail-pane");
        panes.forEach((pane) => {
          if (pane.getAttribute("data-pane") === targetTab) {
            pane.classList.add("active");
          } else {
            pane.classList.remove("active");
          }
        });
      });
    });
  });
}

/**
 * 2. Interactive Mapping Challenge
 */
function initMappingChallenges() {
  const items = document.querySelectorAll(".mapping-item");
  items.forEach((item) => {
    const select = item.querySelector(".mapping-select");
    const btn = item.querySelector(".btn-check");
    const feedback = item.querySelector(".feedback-msg");
    if (!select || !btn || !feedback) return;

    const correctValue = item.getAttribute("data-answer");
    const explanation = item.getAttribute("data-explanation") || "";

    btn.addEventListener("click", () => {
      const val = select.value;
      if (!val) {
        feedback.className = "feedback-msg incorrect";
        feedback.innerHTML = "選択肢を選んでから「検証」を押してください。";
        return;
      }
      if (val === correctValue) {
        feedback.className = "feedback-msg correct";
        feedback.innerHTML = `<strong>✓ 正解です！</strong> ${explanation}`;
      } else {
        feedback.className = "feedback-msg incorrect";
        feedback.innerHTML = `<strong>✗ 再確認しましょう：</strong> 選択されたパス（<code>${val}</code>）ではありません。ヒント：一次ソースの型階層とカーディナリティを確認してください。<br>${explanation}`;
      }
    });
  });
}

/**
 * 3. Retrieval Practice Quiz
 */
function initQuizzes() {
  const cards = document.querySelectorAll(".quiz-question-card");
  cards.forEach((card) => {
    const correctIndex = parseInt(card.getAttribute("data-correct-index"), 10);
    const explanation = card.getAttribute("data-explanation") || "";
    const buttons = card.querySelectorAll(".quiz-option-btn");
    const feedback = card.querySelector(".feedback-msg");

    buttons.forEach((btn, idx) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => {
          b.classList.remove("selected-correct", "selected-wrong");
        });

        if (idx === correctIndex) {
          btn.classList.add("selected-correct");
          if (feedback) {
            feedback.className = "feedback-msg correct";
            feedback.innerHTML = `<strong>✓ 正解！</strong> ${explanation}`;
          }
        } else {
          btn.classList.add("selected-wrong");
          if (feedback) {
            feedback.className = "feedback-msg incorrect";
            feedback.innerHTML = `<strong>✗ 不正解です。</strong> もう一度 <code>.rosetta</code> 定義を思い出して選び直してみてください。<br>${explanation}`;
          }
        }
      });
    });
  });
}

/**
 * 4. Glossary Search Filter
 */
function initGlossaryFilter() {
  const searchInput = document.getElementById("glossary-search");
  if (!searchInput) return;

  const rows = document.querySelectorAll("#glossary-table tbody tr");
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    rows.forEach((row) => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(query) ? "" : "none";
    });
  });
}
