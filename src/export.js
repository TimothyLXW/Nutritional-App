// Produces native SVG shapes and text, avoiding foreignObject HTML that Figma cannot edit.
export function screenSVG(root) {
  const bounds = root.getBoundingClientRect();
  const escape = (s) =>
    String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll('"', "&quot;");
  const parts = [
    `<rect width="${bounds.width}" height="${bounds.height}" rx="36" fill="#fafbf7"/>`,
  ];
  const visible = (el) => {
    const s = getComputedStyle(el);
    return (
      s.display !== "none" && s.visibility !== "hidden" && s.opacity !== "0"
    );
  };
  for (const el of root.querySelectorAll("*")) {
    if (!visible(el) || el.closest(".sheet-backdrop")) continue;
    const r = el.getBoundingClientRect(),
      s = getComputedStyle(el),
      x = r.x - bounds.x,
      y = r.y - bounds.y;
    if (
      !r.width ||
      !r.height ||
      (el.closest("svg") && el.tagName.toLowerCase() !== "svg")
    )
      continue;
    let fill =
      s.backgroundColor === "rgba(0, 0, 0, 0)" ? "none" : s.backgroundColor;
    if (el.classList.contains("food-art") && el.classList.contains("big"))
      fill = "#e9eddf";
    const radius = s.borderRadius.includes("%")
      ? (Math.min(r.width, r.height) * parseFloat(s.borderRadius)) / 100
      : parseFloat(s.borderRadius) || 0;
    const border = parseFloat(s.borderTopWidth) || 0;
    if (fill !== "none" || border)
      parts.push(
        `<rect x="${x}" y="${y}" width="${r.width}" height="${r.height}" rx="${radius}" fill="${fill}" stroke="${border ? s.borderTopColor : "none"}" stroke-width="${border}"/>`,
      );
    if (el.classList.contains("food-art") && el.classList.contains("big"))
      parts.push(
        `<circle cx="${x + r.width / 2}" cy="${y + r.height / 2}" r="${Math.min(r.width, r.height) * 0.4}" fill="#faf9ef" stroke="#f3f1e4" stroke-width="6"/>`,
      );
    if (el.classList.contains("ring")) {
      const size = r.width,
        cx = x + size / 2,
        cy = y + size / 2,
        rad = size / 2 - 4;
      const value = Number(
          (el.style.background.match(/([\d.]+)%/) || [])[1] || 73,
        ),
        circ = 2 * Math.PI * rad;
      parts.push(
        `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="none" stroke="#47745e" stroke-width="8"/><circle cx="${cx}" cy="${cy}" r="${rad}" fill="none" stroke="#e4ba79" stroke-width="8" stroke-dasharray="${(circ * value) / 100} ${circ}" transform="rotate(-90 ${cx} ${cy})"/>`,
      );
    }
    if (el.tagName.toLowerCase() === "svg") {
      const svg = el.cloneNode(true);
      for (const [key, val] of Object.entries({
        x,
        y,
        width: r.width,
        height: r.height,
        color: s.color,
      }))
        svg.setAttribute(key, val);
      parts.push(new XMLSerializer().serializeToString(svg));
      continue;
    }
    if (el instanceof HTMLInputElement || el instanceof HTMLSelectElement) {
      if (el.type !== "file")
        parts.push(
          `<text x="${x + 13}" y="${y + r.height / 2 + 4}" font-family="Arial, sans-serif" font-size="12" fill="${el.value ? s.color : "#a8ae9d"}">${escape(el.value || el.placeholder || "")}</text>`,
        );
      continue;
    }
    for (const node of el.childNodes) {
      if (node.nodeType !== Node.TEXT_NODE || !node.textContent.trim())
        continue;
      // Range measurements preserve natural line breaks without rasterising the text.
      const lines = [];
      const value = node.textContent;
      const pattern = /\S+/g;
      let word;
      while ((word = pattern.exec(value))) {
        const range = document.createRange();
        range.setStart(node, word.index);
        range.setEnd(node, word.index + word[0].length);
        const b = range.getBoundingClientRect();
        if (!b.width) continue;
        let line = lines.find((l) => Math.abs(l.top - b.top) < 3);
        if (line) line.text += " " + word[0];
        else lines.push({ left: b.left, top: b.top, text: word[0] });
      }
      for (const l of lines)
        parts.push(
          `<text x="${l.left - bounds.x}" y="${l.top - bounds.y + parseFloat(s.fontSize) * 0.86}" font-family="Arial, sans-serif" font-size="${parseFloat(s.fontSize)}" font-weight="${s.fontWeight}" letter-spacing="${s.letterSpacing === "normal" ? 0 : s.letterSpacing}" fill="${s.color}">${escape(l.text)}</text>`,
        );
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${bounds.width}" height="${bounds.height}" viewBox="0 0 ${bounds.width} ${bounds.height}"><title>NutriGoal AI — ${escape(root.dataset.screen || "Screen")}</title>${parts.join("")}</svg>`;
}
