<template>
  <figure class="my-10">
    <div class="overflow-x-auto pb-2">
      <svg
        class="flywheel-svg"
        viewBox="0 0 1600 650"
        role="img"
        aria-labelledby="economic-flywheel-title economic-flywheel-description"
      >
        <title id="economic-flywheel-title">The Economic Flywheel</title>
        <desc id="economic-flywheel-description">
          Mining drives vaulting, vaulting creates capacity for Bitcoin locking, Bitcoin locking creates liquidity and
          token demand, and greater token demand increases mining value. Argonot Stakes, Argon Bonds, and Bitcoin
          Liquids connect the four stages.
        </desc>

        <defs>
          <marker id="arrow-amber" markerWidth="22" markerHeight="22" refX="20" refY="11" orient="auto" markerUnits="userSpaceOnUse">
            <path d="M 0 0 L 22 11 L 0 22 Z" fill="#f59e0b" />
          </marker>
          <marker id="arrow-magenta" markerWidth="22" markerHeight="22" refX="20" refY="11" orient="auto" markerUnits="userSpaceOnUse">
            <path d="M 0 0 L 22 11 L 0 22 Z" fill="#bf00ff" />
          </marker>
          <marker id="arrow-lime" markerWidth="22" markerHeight="22" refX="20" refY="11" orient="auto" markerUnits="userSpaceOnUse">
            <path d="M 0 0 L 22 11 L 0 22 Z" fill="#84bd00" />
          </marker>
          <marker id="arrow-charcoal" markerWidth="22" markerHeight="22" refX="20" refY="11" orient="auto" markerUnits="userSpaceOnUse">
            <path d="M 0 0 L 22 11 L 0 22 Z" fill="#38363c" />
          </marker>
          <marker id="arrow-gray" markerWidth="22" markerHeight="22" refX="20" refY="11" orient="auto" markerUnits="userSpaceOnUse">
            <path d="M 0 0 L 22 11 L 0 22 Z" fill="#8b8990" />
          </marker>
        </defs>

        <text class="diagram-kicker" x="800" y="46">Each opportunity strengthens the next</text>

        <g aria-label="Mining">
          <circle cx="200" cy="260" r="150" fill="#f59e0b" fill-opacity="0.07" />
          <path class="wheel wheel-amber" d="M 200 110 A 150 150 0 0 1 350 260" />
          <path class="wheel wheel-amber" d="M 350 260 A 150 150 0 0 1 200 410" />
          <path class="wheel wheel-amber" d="M 200 410 A 150 150 0 0 1 50 260" />
          <path class="wheel wheel-amber" d="M 50 260 A 150 150 0 0 1 200 110" />
          <text class="wheel-title" x="200" y="252">Mining</text>
          <text class="wheel-subtitle" x="200" y="288">Competitive Bids</text>
        </g>

        <g aria-label="Vaulting">
          <circle cx="600" cy="260" r="150" fill="#bf00ff" fill-opacity="0.06" />
          <path class="wheel wheel-magenta" d="M 600 110 A 150 150 0 0 1 750 260" />
          <path class="wheel wheel-magenta" d="M 750 260 A 150 150 0 0 1 600 410" />
          <path class="wheel wheel-magenta" d="M 600 410 A 150 150 0 0 1 450 260" />
          <path class="wheel wheel-magenta" d="M 450 260 A 150 150 0 0 1 600 110" />
          <text class="wheel-title" x="600" y="252">Vaulting</text>
          <text class="wheel-subtitle" x="600" y="288">Capacity + Infrastructure</text>
        </g>

        <g aria-label="Bitcoin locking">
          <circle cx="1000" cy="260" r="150" fill="#84bd00" fill-opacity="0.07" />
          <path class="wheel wheel-lime" d="M 1000 110 A 150 150 0 0 1 1150 260" />
          <path class="wheel wheel-lime" d="M 1150 260 A 150 150 0 0 1 1000 410" />
          <path class="wheel wheel-lime" d="M 1000 410 A 150 150 0 0 1 850 260" />
          <path class="wheel wheel-lime" d="M 850 260 A 150 150 0 0 1 1000 110" />
          <text class="wheel-title" x="1000" y="252">BTC Locking</text>
          <text class="wheel-subtitle" x="1000" y="288">Bitcoin Liquidity</text>
        </g>

        <g aria-label="Token demand">
          <circle cx="1400" cy="260" r="150" fill="#38363c" fill-opacity="0.04" />
          <path class="wheel wheel-charcoal" d="M 1400 110 A 150 150 0 0 1 1550 260" />
          <path class="wheel wheel-charcoal" d="M 1550 260 A 150 150 0 0 1 1400 410" />
          <path class="wheel wheel-charcoal" d="M 1400 410 A 150 150 0 0 1 1250 260" />
          <path class="wheel wheel-charcoal" d="M 1250 260 A 150 150 0 0 1 1400 110" />
          <text class="wheel-title" x="1400" y="252">Token Demand</text>
          <text class="wheel-subtitle" x="1400" y="288">ARGN + ARGNOT Use</text>
        </g>

        <path class="handoff" d="M 370 260 H 425" />
        <path class="handoff" d="M 770 260 H 825" />
        <path class="handoff" d="M 1170 260 H 1225" />

        <text class="bridge-label" x="400" y="462">Argonot Stakes</text>
        <text class="bridge-label" x="800" y="462">Argon Bonds</text>
        <text class="bridge-label" x="1200" y="462">Bitcoin Liquids</text>

        <path class="feedback" d="M 1400 435 C 1400 570 1160 600 800 600 C 440 600 200 570 200 435" />
        <rect x="671" y="562" width="258" height="48" rx="24" fill="#ffffff" />
        <text class="feedback-label" x="800" y="594">Greater Mining Value</text>
      </svg>
    </div>
  </figure>
</template>

<style scoped>
.flywheel-svg {
  display: block;
  width: 100%;
  min-width: 850px;
  height: auto;
}

.flywheel-svg text {
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
}

.diagram-kicker {
  fill: #77747d;
  font-size: 22px;
  font-weight: 600;
  text-anchor: middle;
}

.wheel {
  fill: none;
  stroke-width: 9;
  stroke-linecap: round;
}

.wheel-amber {
  stroke: #f59e0b;
  marker-end: url("#arrow-amber");
}

.wheel-magenta {
  stroke: #bf00ff;
  marker-end: url("#arrow-magenta");
}

.wheel-lime {
  stroke: #84bd00;
  marker-end: url("#arrow-lime");
}

.wheel-charcoal {
  stroke: #38363c;
  marker-end: url("#arrow-charcoal");
}

.wheel-title {
  fill: #2e2c32;
  font-size: 30px;
  font-weight: 750;
  text-anchor: middle;
}

.wheel-subtitle {
  fill: #4f4c55;
  font-size: 18px;
  font-weight: 550;
  text-anchor: middle;
}

.handoff {
  fill: none;
  stroke: #8b8990;
  stroke-width: 7;
  stroke-linecap: round;
  marker-end: url("#arrow-gray");
}

.bridge-label {
  fill: #4f4c55;
  font-size: 19px;
  font-weight: 700;
  text-anchor: middle;
}

.feedback {
  fill: none;
  stroke: #8b8990;
  stroke-width: 6;
  stroke-linecap: round;
  marker-end: url("#arrow-gray");
}

.feedback-label {
  fill: #38363c;
  font-size: 20px;
  font-weight: 700;
  text-anchor: middle;
}
</style>
