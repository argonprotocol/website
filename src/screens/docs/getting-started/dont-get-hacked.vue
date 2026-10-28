<template>
  <DocHeader>Don't Get Hacked</DocHeader>
  <DocContent>
    <p>
      We highly recommend that you follow
      <a href="https://discord.com/invite/argonnetwork" target="_blank" rel="noopener noreferrer">Argon's official Discord server</a>
      for updates, questions, and conversations. It's the easiest way to stay up-to-date on what is happening.
    </p>
    <p>
      However, there is a big caveat!
    </p>
    <p>
      Discord and the broader internet are filled with hackers and scammers.
      Some impersonate Argon's core developers, including
      <strong>@calebjclark</strong> and <strong>@blakeb</strong>, to gain your trust.
      They can copy our names and profile pictures, so a familiar-looking
      profile is not proof that you're talking to one of us.
    </p>
    <p>
      We built <strong>Argon Verifier</strong> to help you check someone's role
      in the official Argon Discord server. Use it to verify anyone who
      contacts you claiming to be part of the core team.
    </p>

    <h2>Add Argon Verifier to Your Account</h2>
    <p>
      Start in the official Argon Discord server using the link above. Find
      Argon Verifier in the server's member list or on one of its messages.
      Only add the app from the official server; scammers can copy an app's
      name and picture, too.
    </p>
    <figure class="my-6 max-w-sm">
      <img
        src="./images/argon-verifier-member-list.png"
        alt="The official Argon Discord member list showing Argon Verifier above the Core Developer group."
        width="484"
        height="432"
        class="h-auto w-full rounded-lg border border-black/10"
        loading="lazy"
      />
      <figcaption class="mt-2 text-sm text-slate-600">
        Find Argon Verifier in the official server's member list.
      </figcaption>
    </figure>
    <ol class="list-decimal">
      <li>
        In the official Argon Discord server, open <strong>Argon Verifier's profile</strong>
        from the member list or one of its messages.
      </li>
      <li>Select <strong>Add App</strong>.</li>
      <li>
        Choose to add it <strong>to your account</strong>, then select
        <strong>Authorize</strong>.
      </li>
    </ol>
    <figure class="my-6 max-w-sm">
      <img
        src="./images/argon-verifier-profile.png"
        alt="Argon Verifier's Discord app profile with the Add App button below its name."
        width="636"
        height="878"
        class="h-auto w-full rounded-lg border border-black/10"
        loading="lazy"
      />
      <figcaption class="mt-2 text-sm text-slate-600">
        Select Add App, add it to your account, and authorize it.
      </figcaption>
    </figure>

    <h2>Verify the Sender</h2>
    <p>
      Once the app is added, open the menu on a message the person sent you
      in a direct message (DM), then follow:
    </p>
    <p><strong>DM → Apps → Verify sender's Argon role</strong></p>
    <div class="my-6 rounded-lg border border-argon-600/30 bg-argon-200/20 p-5">
      <p class="mb-0!">
        <strong>Anyone claiming to be part of Argon's core team should return Core Developer.</strong>
        If the result is missing, different, or you cannot complete the check,
        treat the person as unverified. Return to the official server to ask
        for help before acting on their request.
      </p>
    </div>
    <p>
      Run the check yourself on the sender's message. A screenshot of a
      verification result sent by someone else is not a substitute.
    </p>

    <h2>Keep Your Wallet Safe</h2>
    <p>
      A Core Developer result confirms the sender's role in the server. It
      does not guarantee that a link, download, or transaction is safe.
    </p>
    <ul class="ml-6 list-disc">
      <li>
        Never share your recovery phrase, private keys, passwords, or login
        codes with anyone, including someone offering support.
      </li>
      <li>
        Be cautious with unexpected links, downloads, and requests to connect
        a wallet or sign a transaction. Stop if someone pressures you to act
        quickly or send funds to resolve a problem.
      </li>
      <li>
        If you suspect an impersonator, stop the conversation and report the
        account through Discord. Ask for help in the official Argon server
        without posting sensitive information.
      </li>
    </ul>
    <p>
      Before funding your wallet, read
      <DocLink to="/docs/desktop-app/self-custody-risks">Self-Custody Risks</DocLink>
      for more on protecting your keys and recovery information.
    </p>
  </DocContent>
</template>

<script setup lang="ts">
import DocLink from "@/screens/docs/DocLink.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
import DocContent from "@/screens/docs/DocContent.vue";
</script>
