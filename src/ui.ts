import { isValidHex, normalizeHex } from "./color/convert.js";
import { harmonyTargets, type Harmony } from "./color/harmony.js";
import { nearestMany, type PaletteColor } from "./color/nearest.js";
import { PALETTES } from "./palettes.js";

const HARMONIES: { id: Harmony; label: string }[] = [
  { id: "complementary", label: "Complementary（補色）" },
  { id: "analogous", label: "Analogous（類似色）" },
  { id: "triadic", label: "Triadic（トライアド）" },
  { id: "monochromatic", label: "Monochromatic（モノクロマティック）" },
];

const DEFAULT_BASE = "#1a73e8";

export function mount(root: HTMLElement): void {
  const palette = PALETTES[0]!.colors;

  root.innerHTML = `
    <header>
      <h1>Color Combo Finder</h1>
      <p class="subtitle">ベースカラーに対する 4 種の色彩理論の組み合わせを、ハードコードされたパレットの近傍色にマッピング。</p>
    </header>

    <section class="card">
      <h2>ベースカラー</h2>
      <div class="input-row">
        <input id="hex-text" type="text" value="${DEFAULT_BASE}" maxlength="7" spellcheck="false" autocomplete="off" />
        <input id="hex-color" type="color" value="${DEFAULT_BASE}" aria-label="カラーピッカー" />
      </div>
      <p id="error" class="error" hidden></p>
    </section>

    <section class="card">
      <h2>パレット (${PALETTES[0]!.name})</h2>
      <div id="palette" class="chip-row"></div>
    </section>

    <section class="card">
      <h2>組み合わせ</h2>
      <div id="results" class="results"></div>
    </section>
  `;

  const textInput = root.querySelector<HTMLInputElement>("#hex-text")!;
  const colorInput = root.querySelector<HTMLInputElement>("#hex-color")!;
  const errorEl = root.querySelector<HTMLElement>("#error")!;
  const paletteEl = root.querySelector<HTMLElement>("#palette")!;
  const resultsEl = root.querySelector<HTMLElement>("#results")!;

  renderPalette(paletteEl, palette);

  function update(input: string): void {
    if (!isValidHex(input)) {
      errorEl.textContent = "#RRGGBB 形式で入力してください";
      errorEl.hidden = false;
      resultsEl.innerHTML = "";
      return;
    }
    errorEl.hidden = true;
    const hex = normalizeHex(input);
    colorInput.value = hex;
    renderResults(resultsEl, hex, palette);
  }

  textInput.addEventListener("input", () => update(textInput.value));
  colorInput.addEventListener("input", () => {
    textInput.value = colorInput.value;
    update(colorInput.value);
  });

  update(textInput.value);
}

function renderPalette(el: HTMLElement, palette: PaletteColor[]): void {
  el.innerHTML = palette.map((c) => chip(c.hex, c.name)).join("");
}

function renderResults(
  el: HTMLElement,
  base: string,
  palette: PaletteColor[],
): void {
  el.innerHTML = HARMONIES.map(({ id, label }) => {
    const targets = harmonyTargets(id, base);
    const matches = nearestMany(targets, palette);
    const cells = targets
      .map(
        (t, i) => `
        <div class="combo-cell">
          ${chip(t, undefined, "small")}
          <span class="arrow" aria-hidden="true">→</span>
          ${chip(matches[i]!.hex, matches[i]!.name)}
        </div>
      `,
      )
      .join("");
    return `
      <article class="harmony">
        <h3>${label}</h3>
        <div class="combo">${cells}</div>
      </article>
    `;
  }).join("");
}

function chip(hex: string, name?: string, size?: "small"): string {
  const sizeClass = size ? ` chip--${size}` : "";
  const nameHtml = name ? `<span class="chip__name">${escapeHtml(name)}</span>` : "";
  return `
    <span class="chip${sizeClass}">
      <span class="chip__swatch" style="background:${hex}"></span>
      <span class="chip__text">
        ${nameHtml}
        <code class="chip__hex">${hex}</code>
      </span>
    </span>
  `;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
