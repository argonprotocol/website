<template>
  <DocHeader>Argon Desktop</DocHeader>

  <DocContent>
    <p>
      Argon Desktop is a self-custodial app for managing assets and participating
      in the Argon economy. It brings wallet tools,
      yield-bearing positions, and network operations into one interface. It runs
      on macOS, Windows, and Linux.
    </p>

    <VideoLoop src="/videos/desktop-app-overview.webm" class="mt-8 mb-14">
      <li>Welcome Screen</li>
      <li>Account Overview</li>
      <li>Account Overview -- Highlight leftbar</li>
      <li>Account Overview -- Highlight topbar</li>
      <li>Request Treasury Access</li>
    </VideoLoop>

    <h2>How the App Is Organized</h2>
    <p>
      The left sidebar is organized by access level. Basic tools are always
      visible. Treasury and Operations sections appear when you unlock those
      levels. You can open your internal wallet from anywhere by selecting the
      wallet summary at the bottom of the sidebar.
    </p>

    <p>
      The top bar shows your certification progress, sponsor and server
      connections, portfolio value, and returns. It also provides access to
      currency display options and account settings.
    </p>

    <h2>Three Levels of Access</h2>
    <p>
      <strong>Basic</strong> is available to everyone as soon as they download the
      app. It includes the core wallet and network tools needed to get started.
    </p>

    <p>
      <strong>Treasury</strong> requires an invitation from an existing Operator.
      It provides access to the network's yield-bearing assets, including
      <DocLink to="/docs/assets-and-entities/bitcoin-liquids">Bitcoin Liquids</DocLink>,
      <DocLink to="/docs/assets-and-entities/argon-bonds">Argon Bonds</DocLink>, and
      <DocLink to="/docs/assets-and-entities/argonot-stakes">Argonot Stakes</DocLink>.
    </p>

    <p>
      <strong>Operations</strong> is the app's highest access level and requires
      approval from an existing Operator. Operators can compete for
      <DocLink to="/docs/assets-and-entities/mining-operations"
        >Mining Seats</DocLink
      >, establish and manage
      <DocLink to="/docs/assets-and-entities/vaulting-operations"
        >Vaults</DocLink
      >, and onboard new members.
    </p>

    <h2>Self-Custody</h2>
    <p>
      Argon Desktop manages your wallet locally on your computer, and you retain
      control of your signing keys. Your recovery credentials are never sent to
      an Upstream Node or third-party account. Only you can authorize transactions
      from your accounts.
    </p>

    <p>
      The app connects to blockchains and external services to display current
      balances, prices, positions, and network activity. Treasury members connect
      to an Upstream Node. Operators can also configure and monitor their own
      operational server through the app. These connections provide data and
      services while you retain control of your accounts.
    </p>

    <p>
      Read
      <DocLink to="/docs/desktop-app/self-custody-risks"
        >Self-Custody Risks</DocLink
      >
      before funding your account or opening a position.
    </p>

    <h2>Getting Started</h2>
    <ol class="ml-6 list-decimal">
      <li>
        <DocLink to="/desktop-app">Download Argon Desktop</DocLink> for
        your operating system.
      </li>
      <li>
        Create a new Argon account or import an existing one.
      </li>
      <li>
        Start with Account Overview and the Basic tools. Request Treasury or
        Operations access when you're ready.
      </li>
    </ol>
  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
import VideoLoop from "@/components/VideoLoop.vue";
</script>
