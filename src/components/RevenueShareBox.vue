<template>
  <section class="RevenueShareBox my-8 rounded-lg border border-argon-300 bg-argon-50/50 p-5">
    <h3 class="revenue-title"><slot name="title" /> Revenue Share</h3>

    <div class="share-breakdown" role="group" aria-label="Revenue share breakdown">
      <dl class="share-item">
        <dt>Base share</dt>
        <dd>{{ baseShare }}%</dd>
      </dl>
      <span class="operator" aria-hidden="true">+</span>
      <dl class="share-item">
        <dt>Profit Surges</dt>
        <dd>{{ profitSurge }}%</dd>
      </dl>
      <span class="operator" aria-hidden="true">=</span>
      <dl class="share-item">
        <dt>Total share</dt>
        <dd>{{ baseShare }}%–{{ baseShare + profitSurge }}%</dd>
      </dl>
    </div>

    <dl class="yield-details">
      <dt>Profit Surges</dt>
      <dd>Optional additional revenue sharing granted by an Upstream Operator.</dd>
      <dt>APY throttle</dt>
      <dd>
        Above <strong>{{ throttleApy }}% APY</strong>, half of the excess earnings
        is paid out and half goes into reserve.
      </dd>
      <dt>Yield reserve</dt>
      <dd>
        Supports payouts when revenue is low, aiming to sustain
        <strong>{{ throttleApy }}% APY</strong> while reserves are available.
      </dd>
    </dl>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  baseShare: number;
  profitSurge: number;
  throttleApy: number;
}>();
</script>

<style scoped>
.RevenueShareBox {
  container-type: inline-size;
  color: var(--color-slate-800);
  font-size: 14px;
  line-height: 1.5;
}

.RevenueShareBox .revenue-title {
  margin: 0 0 16px;
  color: var(--color-argon-700);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.25rem;
  letter-spacing: 0.025em;
  text-transform: uppercase;
}

.share-breakdown {
  display: grid;
  grid-template-columns: max-content 24px max-content 24px max-content;
  gap: 16px;
  align-items: end;
  justify-content: start;
  margin: 0 0 16px;
}

.share-item {
  margin: 0;
}

.share-item dt {
  color: var(--color-slate-600);
}

.share-item dd {
  margin: 3px 0 0;
  color: var(--color-argon-700);
  font-size: 26px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.operator {
  justify-self: center;
  color: var(--color-slate-600);
  font-size: 26px;
  font-weight: 500;
}

.yield-details {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 9px 16px;
  margin: 0;
  padding-top: 14px;
  border-top: 1px solid var(--color-argon-200);
}

.yield-details dt {
  font-weight: 500;
}

.yield-details dd {
  margin: 0;
  color: var(--color-slate-600);
}

.yield-details strong {
  color: var(--color-slate-800);
  font-weight: 700;
}

@container (max-width: 480px) {
  .share-breakdown {
    grid-template-columns: 26px max-content;
    gap: 16px 12px;
  }

  .share-item {
    grid-column: 2;
  }

  .operator {
    grid-column: 1;
  }

  .share-item dd,
  .operator {
    font-size: 23px;
  }

  .yield-details {
    grid-template-columns: 1fr;
    gap: 4px;
  }

  .yield-details dt:not(:first-child) {
    margin-top: 8px;
  }
}
</style>
