<template>
  <DocHeader>Operations (Level Three)</DocHeader>

  <DocContent>
    <p>
      Operations is the third level of Argon Desktop. It turns the app from a
      wallet and capital-participation interface into a control center for
      running Argon infrastructure. Its primary activities are Mining, Vaulting,
      and Member Onboarding.
    </p>

    <p>
      Operations does not replace Basic or Treasury. Their wallets, transfers,
      Stable Swaps, Bitcoin Locks, Argon Bonds, and Argonot Stakes remain
      available alongside the operational tools.
    </p>

    <h2>Receiving Operations Access</h2>
    <p>
      A Treasury member can request an Operations upgrade after completing
      <router-link to="/docs/desktop-app/treasury-certification"
        >Treasury Certification</router-link
      >. The sponsoring Operator reviews the request and must use an available
      Operations upgrade code to approve it.
    </p>

    <p>
      Approval registers a linked account set for the new operation: an
      Operational Account, a vault account, and a mining account. It also
      records the sponsor as the new account's upstream Operator. These accounts
      separate the capital and transaction history used for different
      operational responsibilities while remaining visible in one app.
    </p>

    <p>
      Registration unlocks the Operations interface, but the new Operator is not
      yet certified. See
      <router-link to="/docs/desktop-app/access-codes"
        >Access and Upgrades</router-link
      >
      for the approval sequence.
    </p>

    <h2>The Operational Server</h2>
    <p>
      Mining and Vaulting require services that remain available when Argon
      Desktop is closed. The app can guide you through provisioning a supported
      server or connecting a machine you manage. Once connected, the Server menu
      shows its current status and provides access to configuration,
      diagnostics, and maintenance tools.
    </p>

    <p>
      The operational server performs recurring network work, while Argon
      Desktop remains the interface for setup, monitoring, and decisions that
      require your approval. It also becomes the Operator's
      <router-link to="/docs/assets-and-entities/upstream-nodes"
        >Upstream Node</router-link
      >
      for sponsored members.
    </p>

    <h2>Mining</h2>
    <p>
      The Mining section sets up the machine and accounts used to compete for
      mining seats. Argon Desktop prepares the mining authority keys, shows the
      required ARGN bid and ARGNOT commitment, and helps configure the bidding
      strategy used by the mining bot.
    </p>

    <p>
      After setup, the Mining dashboard follows current bids, upcoming auctions,
      active seats, completed terms, block rewards, and the assets associated
      with the operation. One Operator can fund multiple mining accounts and
      compete for multiple seats. Read
      <router-link to="/docs/assets-and-entities/mining-operations"
        >Mining Operations</router-link
      >
      for the auction and seat rules.
    </p>

    <h2>Vaulting</h2>
    <p>
      The Vaulting section guides the Operator through creating a Stabilization
      Vault, committing insurance capital, and configuring the terms offered to
      Bitcoin holders and Argon Bond participants. The app then shows how the
      vault's capital is allocated and how much of its capacity is being used.
    </p>

    <p>
      The Vaulting dashboard surfaces the ongoing work that requires attention,
      including Bitcoin cosigning, capital changes, settings, revenue
      collection, and vault health. Read
      <router-link to="/docs/assets-and-entities/vaulting-operations"
        >Vaulting Operations</router-link
      >
      for the service and capital requirements.
    </p>

    <h2>Member Onboarding</h2>
    <p>
      Certified Operators can use Member Onboarding to invite Treasury members,
      follow their public certification progress, review Operations upgrade
      requests, and manage available upgrade codes. Each accepted member is
      connected to the Operator's Upstream Node while keeping control of their
      own wallet.
    </p>

    <p>
      The onboarding dashboard also tracks qualifying certifications, referral
      progress, and rewards that are ready to claim. See
      <router-link to="/docs/assets-and-entities/operational-rewards-pool"
        >Operational Rewards Pool</router-link
      >
      for the funding and eligibility rules.
    </p>

    <h2>Conditional Crosschain Roles</h2>
    <p>
      Crosschain tools appear only when the Operator has an applicable role.
      Localized Minting Authorities review and authorize supported transfers,
      while active members of the Global Issuance Council participate in the
      approvals assigned to that council. Operations access alone does not grant
      either role.
    </p>

    <p>
      Continue to
      <router-link to="/docs/bridgeless-transfers/localized-minting-authorities"
        >Localized Minting Authorities</router-link
      >
      and
      <router-link to="/docs/bridgeless-transfers/global-issuance-council"
        >Global Issuance Council</router-link
      >
      for those responsibilities.
    </p>

    <h2>Operator Certification</h2>
    <p>
      The certification menu guides a newly registered Operator through the
      qualifying transfer, vault capital, and mining-seat requirements needed
      for activation. The checklist updates from finalized activity across the
      linked operational accounts.
    </p>

    <p>
      Certification establishes full Operator status, makes the first upgrade
      code available, and records the applicable onboarding rewards. Read
      <router-link to="/docs/desktop-app/operations-certification"
        >Operator Certification</router-link
      >
      for the current requirements and activation results.
    </p>

    <h2>Ongoing Operation</h2>
    <p>
      Argon Desktop brings server health, mining auctions, active seats, vault
      duties, member activity, financial positions, and returns into one
      interface. Alerts identify work that needs attention, while the individual
      dashboards preserve the state and history of each operation.
    </p>

    <p>
      Automation handles repeatable work, but the Operator remains responsible
      for the machines, keys, capital, service settings, and transactions used
      by the operation. Keeping the server available and responding to required
      actions are continuing parts of participating at Level Three.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
