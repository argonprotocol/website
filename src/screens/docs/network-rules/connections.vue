<template>
  <DocHeader>Network Connections</DocHeader>

  <DocContent>
    <p>
      Connections link Argon's members and operators into a network. Your upstream connection is the
      operator who sponsors you. Your downstream connections are the members and operators you sponsor.
      Planned operator alliances will extend this network, allowing operators to borrow or supply unused
      Securitization or BTC to help fill their vaults.
    </p>

    <section class="my-8 overflow-hidden rounded-lg border border-slate-300 bg-white/40">
      <header class="border-b border-slate-300 bg-slate-100/70 px-5 py-3 text-sm font-bold tracking-wide text-slate-600 uppercase">
        Your Connections
      </header>
      <dl class="m-0">
        <div class="border-b border-slate-300 px-5 py-4 md:flex md:gap-6">
          <dt class="font-bold text-slate-800 md:w-48 md:shrink-0">Upstream</dt>
          <dd class="m-0 mt-1 text-slate-600 md:mt-0">
            Your sponsoring operator, who invites you into Treasury and can approve your upgrade to
            Operations.
          </dd>
        </div>
        <div class="border-b border-slate-300 px-5 py-4 md:flex md:gap-6">
          <dt class="font-bold text-slate-800 md:w-48 md:shrink-0">Downstream</dt>
          <dd class="m-0 mt-1 text-slate-600 md:mt-0">
            The members you invite and the operators you help onboard through your sponsorship.
          </dd>
        </div>
        <div class="px-5 py-4 md:flex md:gap-6">
          <dt class="font-bold text-slate-800 md:w-48 md:shrink-0">Alliances</dt>
          <dd class="m-0 mt-1 text-slate-600 md:mt-0">
            Planned connections with other operators for borrowing or supplying unused vault resources.
          </dd>
        </div>
      </dl>
    </section>

    <p>
      Upstream and downstream describe the same sponsorship relationship from opposite ends. If an
      operator sponsors you, you are downstream from that operator. When you become an operator and
      sponsor someone else, that member is downstream from you.
    </p>

    <h2>Upstream Connections</h2>

    <p>
      Your upstream connection begins when you accept a Treasury access code from an existing operator.
      The invitation identifies your sponsor and their server, allowing Argon Desktop to establish an
      authenticated connection for Treasury services. Basic wallet functions are available without this
      connection.
    </p>

    <p>
      Depending on your access and the operator's setup, your sponsor can provide:
    </p>

    <ul class="list-disc pl-5">
      <li>
        Access to their Stabilization Vault for
        <DocLink to="/docs/asset-rules/bitcoin-locks">Bitcoin Locks</DocLink> and
        <DocLink to="/docs/asset-rules/argon-bonds">Argon Bonds</DocLink>.
      </li>
      <li>
        An optional Bitcoin Lock fee waiver, subject to the amount and expiration they select.
      </li>
      <li>
        Coordination of certification progress and your request to upgrade to Operations.
      </li>
      <li>
        The signed access proof required to register your Operational Account if they approve your
        upgrade.
      </li>
    </ul>

    <p>
      Accepting a Treasury invitation records the sponsor in the app. Protocol registration happens
      later, after you complete Treasury Certification and your sponsor approves an Operations upgrade.
      Registration records the sponsor as your upstream operator. See
      <DocLink to="/docs/desktop-app/access-codes">Access and Upgrades</DocLink> for that process.
    </p>

    <p>
      You can open <strong>Sponsor Details</strong> in Argon Desktop to review your sponsor's name,
      public account, server connection, and any current Bitcoin Lock fee waiver.
    </p>

    <h2>Downstream Connections</h2>

    <p>
      As an operator, you build downstream connections by inviting members into Treasury and helping
      eligible members become operators. These are the same relationships that those members see as
      their upstream connections to you.
    </p>

    <p>
      A downstream connection can be a Treasury member or a registered operator. Treasury members use
      your services through Argon Desktop. Members who complete certification and receive your approval
      can register an Operational Account and set up their own mining or vaulting infrastructure.
    </p>

    <p>
      Operators manage these relationships through Onboarding in Argon Desktop. You can create
      invitations, view members' certification progress, review Operations upgrade requests, manage
      available upgrade codes, and track sponsored operators.
    </p>

    <p>
      When a downstream member becomes a certified operator, the sponsor may qualify for an upgrade
      code or a certification reward. See
      <DocLink to="/docs/network-rules/certification-rewards">Certification Rewards</DocLink> for the
      funding and eligibility rules.
    </p>

    <h2>Operator Alliances</h2>

    <aside class="my-8 rounded-lg border border-argon-200 bg-white/40 px-5 py-4">
      <strong class="mb-1 block">Planned Capability</strong>
      <p class="m-0">
        Alliance discovery and borrowing are planned additions to Argon Desktop. Operators will be able
        to search a list of other operators and create connections to build their network.
      </p>
    </aside>

    <p>
      An alliance is a connection between operators for coordinating vault resources. Operators will
      be able to borrow unused Securitization or BTC from other vaults or operators to help fill their
      own vaults.
    </p>

    <div class="my-8 grid gap-4 md:grid-cols-2">
      <section class="rounded-lg border border-slate-300 bg-white/40 px-5 py-4">
        <h3 class="mt-0!">Securitization</h3>
        <p class="mb-0!">
          An operator with unused securitization capital could supply it to an allied operator whose
          vault needs additional backing.
        </p>
      </section>
      <section class="rounded-lg border border-slate-300 bg-white/40 px-5 py-4">
        <h3 class="mt-0!">BTC</h3>
        <p class="mb-0!">
          An operator with unused BTC could supply it to an allied operator seeking to fill their
          vault's available Bitcoin capacity.
        </p>
      </section>
    </div>

    <p>
      Sponsorship establishes the invitation and access relationship. Alliances will add peer
      connections for working with other operators and matching available resources with vault needs.
      The borrowing terms and transaction process will be described when the capability launches.
      See <DocLink to="/docs/network-rules/vaulting-operations">Vaulting Operations</DocLink> for
      how vault capital and Bitcoin participation work today.
    </p>

    <h2>Building Your Network</h2>

    <p>
      Your network begins with the sponsor who invites you. Becoming an operator lets you grow that
      network by inviting and sponsoring new members. Alliances will add a way to discover other
      operators and form connections around complementary vault resources.
    </p>

    <p>
      The planned Desktop experience will bring operator discovery and connection creation into the
      app, giving operators a place to find potential alliance partners and build their network
      alongside their upstream and downstream relationships.
    </p>

    <h2>Connections and Nodes</h2>

    <p>
      A connection describes a relationship. A node is the server that provides network services.
      Your sponsor's server is your <strong>Upstream Node</strong>; the person or account responsible
      for it is your <strong>upstream operator</strong>. A downstream operator may run their own node,
      while a downstream Treasury member can connect through Argon Desktop without running one.
    </p>

    <p>
      The upstream server maintains the authenticated session and coordinates member services. Its
      operator can associate an invitation with a public account, view public onchain activity used
      for certification, manage offered fee waivers, and respond to upgrade requests.
    </p>

    <p>
      You retain control of your wallet's signing keys. Argon Desktop authenticates to the upstream
      server with a separate derived account, keeping your recovery phrase and private transaction
      keys local. You choose whether to commit assets and approve each wallet transaction.
    </p>

    <p>
      Services provided by an upstream server depend on that server being reachable. An outage can
      interrupt those services while assets already recorded on Argon or Bitcoin remain governed by
      their existing keys and protocol rules. Argon Desktop keeps protected recovery information to
      help locate an upstream service if its address changes; members and operators should also
      maintain their own backups.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
</script>
