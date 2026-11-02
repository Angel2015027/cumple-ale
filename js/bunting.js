let buntingWidth = 0;

function buildBunting() {
  const W = Math.max(Math.round(innerWidth), 320), H = 130;
  if (W === buntingWidth) return;
  buntingWidth = W;
  const colors = ['#ff2d2d', '#ffd400', '#2f8cff', '#ffffff', '#2ee86b', '#ff8a00'];
  let svg = '';
  [[10, 46, 34], [-30, 82, 26]].forEach(([offset, sag, size], row) => {
    const spans = Math.max(2, Math.round(W / 420));
    const span = W / spans;
    for (let s = 0; s < spans; s++) {
      const x0 = s * span + offset * row, x1 = x0 + span, y0 = row ? 26 : 2;
      svg += `<path d="M${x0} ${y0}Q${x0 + span / 2} ${y0 + sag * 2} ${x1} ${y0}" fill="none" stroke="#c9ced9" stroke-width="2"/>`;
      const count = Math.floor(span / (size + 6));
      for (let i = 1; i < count; i++) {
        const t = i / count, x = x0 + span * t;
        const y = (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * (y0 + sag * 2) + t * t * y0;
        svg += `<path class="pennant" d="M${(x - size / 2).toFixed(1)} ${y.toFixed(1)}h${size}l${-size / 2} ${size * 1.25}z" fill="${colors[(i + s + row) % colors.length]}" stroke="#111" stroke-width="2" stroke-linejoin="round"/>`;
      }
    }
  });
  const bunting = document.querySelector('.bunting');
  if (!bunting) return;
  bunting.querySelector('svg')?.remove();
  bunting.insertAdjacentHTML('beforeend', `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMin meet">${svg}</svg>`);
}

buildBunting();
addEventListener('resize', buildBunting);
