<template>
  <DocHeader>Argon Desktop</DocHeader>

  <DocContent>
    <p>
      Argon Desktop is a self-custodial application for holding, moving, and
      using assets across the Argon economy. It combines wallet activity,
      yield-bearing positions, and network operations in one interface that runs
      on macOS, Windows, and Linux.
    </p>

    <p>
      The app does not create an account with the Argon team or take custody of
      your assets. You control your wallet keys and approve each transaction. As
      you gain access to additional parts of the network, the same app adds the
      tools appropriate to your level of participation.
    </p>

    <VideoLoop src="/videos/desktop-app-overview.webm" class="mb-10" />

    <h2>One App That Grows With You</h2>
    <p>
      Argon Desktop has three levels: Basic, Treasury, and Operations. Everyone
      begins with Basic. An invitation from an existing Operator can unlock
      Treasury, and a Treasury member who completes certification can request an
      upgrade to Operations.
    </p>

    <p>
      An upgrade adds capabilities; it does not replace your installation or
      transfer control of your account. See
      <router-link to="/docs/desktop-app/access-codes"
        >Access and Upgrades</router-link
      >
      for the invitation, sponsorship, and certification process.
    </p>

    <h3>Basic</h3>
    <p>
      Basic provides the wallet and network tools available to every user. You
      can create or import an Argon account, connect Ethereum wallets, view
      balances and transaction history, move supported assets, use
      <router-link to="/docs/assets-and-entities/stable-swaps"
        >Stable Swaps</router-link
      >, and follow the network's current economics.
    </p>

    <p>
      Basic does not require an invitation or a sponsoring Operator. Continue to
      <router-link to="/docs/desktop-app/basic-functionality"
        >Basic Functionality</router-link
      >
      for a closer look at these tools.
    </p>

    <h3>Treasury</h3>
    <p>
      Treasury adds the network's capital-participation tools. Its navigation
      includes
      <router-link to="/docs/assets-and-entities/bitcoin-locks"
        >Bitcoin Locks</router-link
      >,
      <router-link to="/docs/assets-and-entities/argon-bonds"
        >Argon Bonds</router-link
      >,
      <router-link to="/docs/assets-and-entities/argonot-stakes"
        >Argonot Stakes</router-link
      >. These sections let a member put assets to work without operating the
      network's mining and vaulting infrastructure.
    </p>

    <p>
      A Treasury member is connected to a sponsoring Operator and that
      Operator's
      <router-link to="/docs/assets-and-entities/upstream-nodes"
        >Upstream Node</router-link
      >. The connection provides access to supported services, but it does not
      give the Operator authority over the member's wallet.
    </p>

    <h3>Operations</h3>
    <p>
      Operations adds the tools needed to help run the network. Operators can
      compete for
      <router-link to="/docs/assets-and-entities/mining-operations"
        >Mining Operations</router-link
      >, establish and manage
      <router-link to="/docs/assets-and-entities/vaulting-operations"
        >Vaulting Operations</router-link
      >, and onboard new members. Operators who take on eligible crosschain
      roles also receive the corresponding authorization and transfer tools.
    </p>

    <p>
      Argon Desktop guides server setup, displays operational status, and
      organizes recurring workflows. The Operator still chooses how much capital
      to commit, which services to offer, and which transactions to approve.
    </p>

    <h2>How the App Is Organized</h2>
    <p>
      The Account Overview is the starting point. It brings together your Argon
      and connected Ethereum wallets, current balances, available funds, and
      purchasing-power information.
    </p>

    <p>
      The left sidebar is divided by access level. Basic tools are always
      visible. Treasury and Operations sections appear when those levels are
      unlocked, keeping the interface focused on the activities available to
      you. The wallet summary at the bottom of the sidebar provides a consistent
      way to open a wallet from anywhere in the app.
    </p>

    <p>
      The top of the window contains the controls that apply across activities:
      certification progress, sponsor and server connections, portfolio value,
      returns, currency display, and account settings. The main workspace then
      changes with the activity selected from the sidebar.
    </p>

    <h2>Self-Custody with Connected Services</h2>
    <p>
      Argon Desktop keeps signing authority on your computer. Recovery
      credentials are not sent to a sponsor, Upstream Node, or Argon-operated
      account system. When a workflow requires an onchain action, the app shows
      the transaction for you to authorize with the appropriate local account.
    </p>

    <p>
      Self-custody does not mean the app works in isolation. It reads the
      blockchains and services needed to show current balances, prices,
      positions, and network activity. Treasury members connect to an Upstream
      Node, while Operators can use Argon Desktop to configure and monitor their
      own operational server. Those connections provide data and services
      without replacing your control of the underlying accounts.
    </p>

    <p>
      Read
      <router-link to="/docs/desktop-app/self-custody-risks"
        >Self-Custody Risks</router-link
      >
      before funding an account or beginning a position.
    </p>

    <h2>Getting Started</h2>
    <ol class="ml-6 list-decimal">
      <li>
        <router-link to="/desktop-app">Download Argon Desktop</router-link> for
        your operating system.
      </li>
      <li>
        Create a new Argon account or import an account you already control.
      </li>
      <li>
        Begin with the Account Overview and Basic tools, then explore Treasury
        or Operations if you decide to pursue a higher participation level.
      </li>
    </ol>
  </DocContent>
</template>

<script setup lang="ts">
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
import VideoLoop from "@/components/VideoLoop.vue";
</script>
