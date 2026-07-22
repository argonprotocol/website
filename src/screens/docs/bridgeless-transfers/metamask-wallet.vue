<template>
  <DocHeader>
    Connect a MetaMask Wallet
  </DocHeader>
  <DocContent>
    <p>
      Argon Desktop can connect to an Ethereum account from MetaMask using that account's private key. Once connected,
      you can use the account with Argon's bridgeless transfer features.
    </p>

    <aside class="SecurityWarning">
      <strong>Protect your private key.</strong>
      Anyone who has it can control the account and its funds. Only enter it directly into Argon Desktop on a device
      you trust. Never send it to another person, website, support representative, or chat. You might consider creating a
      dedicated MetaMask account for use with Argon instead of importing your primary account.
    </aside>

    <h2>Start In Argon Desktop</h2>
    <p class="mt-2">
      Open your Argon Desktop app and from the Account Overview screen click <strong>Connect Ethereum Wallet</strong> (<strong>see A</strong>).
    </p>

    <figure class="DesktopFigure AnnotatedFigure ConnectFigure">
      <div class="ScreenshotFrame">
        <img :src="connectWalletImage" alt="Connect Ethereum Wallet on the Argon Desktop Account Overview" />
        <span class="StepMarker MarkerA" aria-hidden="true">A</span>
      </div>
    </figure>

    <p>
      In the overlay that will appear, select <strong>Private Key</strong> (see <strong>B</strong>).
      Keep this window open while you retrieve the private key from MetaMask.
    </p>

    <figure class="DesktopFigure AnnotatedFigure ImportFigure">
      <div class="ScreenshotFrame">
        <img :src="importWalletImage" alt="Argon Desktop Connect Ethereum Wallet import method window" />
        <span class="StepMarker MarkerB" aria-hidden="true">B</span>
      </div>
    </figure>

    <h2 class="mt-5">Switch to Your MetaMask Browser Extension</h2>

    <p class="mt-2">
      Open the browser that holds your MetaMask extension. Make sure you've selected the exact account you want to connect to Argon Desktop.
    </p>

    <div class="StepGrid">
      <figure class="AnnotatedFigure MetaMaskFigure AccountSelectorFigure">
        <div class="ScreenshotFrame">
          <img :src="metamaskStepA" alt="MetaMask wallet account selector" />
          <span class="StepMarker MarkerC" aria-hidden="true">C</span>
        </div>
        <figcaption>Click your account name at the top of the extension (see <strong>C</strong>). This will open a menu.</figcaption>
      </figure>

      <figure class="AnnotatedFigure MetaMaskFigure AccountMenuFigure">
        <div class="ScreenshotFrame">
          <img :src="metamaskStepBC" alt="MetaMask account list with the options menu and Account details" />
          <span class="StepMarker MarkerD" aria-hidden="true">D</span>
          <span class="StepMarker MarkerE" aria-hidden="true">E</span>
        </div>
        <figcaption>
          <span class="block">Find the account you want to connect and click its three-dot menu (see <strong>D</strong>).</span>
          <span class="mt-2 block">In the menu that appears, click <strong>Account details</strong> (see <strong>E</strong>).</span>
        </figcaption>
      </figure>

      <figure class="AnnotatedFigure MetaMaskFigure PrivateKeysFigure">
        <div class="ScreenshotFrame">
          <img :src="metamaskStepD" alt="MetaMask Account details screen with Private keys" />
          <span class="StepMarker MarkerF" aria-hidden="true">F</span>
        </div>
        <figcaption>Click <strong>Private keys</strong> (see <strong>F</strong>).</figcaption>
      </figure>

      <figure class="AnnotatedFigure MetaMaskFigure PasswordFigure">
        <div class="ScreenshotFrame">
          <img :src="metamaskStepE" alt="MetaMask password confirmation screen" />
          <span class="StepMarker MarkerG" aria-hidden="true">G</span>
        </div>
        <figcaption>Enter your MetaMask password and click <strong>Confirm</strong> (see <strong>G</strong>).</figcaption>
      </figure>
    </div>

    <figure class="KeyFigure AnnotatedFigure MetaMaskFigure CopyKeyFigure">
      <div class="ScreenshotFrame">
        <img :src="metamaskStepF" alt="MetaMask private keys screen with the Ethereum copy button" />
        <span class="StepMarker MarkerH" aria-hidden="true">H</span>
      </div>
      <figcaption>
        Find <strong>Ethereum</strong> and click its copy button (see <strong>H</strong>). Do not copy a key for Linea,
        Base, Arbitrum, BNB Chain, or another network.
      </figcaption>
    </figure>

    <h2 class="pt-5">Finish In Argon Desktop</h2>

    <p class="mt-2">
      Return to the Connect Ethereum Wallet overlay previously opened in Argon Desktop, and paste the copied value into
      the private-key field (see <strong>I</strong>).
    </p>
    <p>
      Enter a recognizable name for the wallet (see <strong>J</strong>) then click
      <strong>Import Wallet</strong> (see <strong>K</strong>).
    </p>

    <figure class="DesktopFigure AnnotatedFigure ImportFigure FinishImportFigure">
      <div class="ScreenshotFrame">
        <img :src="importWalletImage" alt="Private key and wallet name fields in Argon Desktop" />
        <span class="StepMarker MarkerI" aria-hidden="true">I</span>
        <span class="StepMarker MarkerJ" aria-hidden="true">J</span>
        <span class="StepMarker MarkerK" aria-hidden="true">K</span>
      </div>
    </figure>

    <aside class="SecurityNote">
      After connecting, remove the private key from your clipboard by copying some harmless text. Do not save the key
      in notes, screenshots, email, cloud storage, or an unencrypted file.
    </aside>
  </DocContent>
</template>

<script setup lang="ts">
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
import connectWalletImage from "./images/argon-desktop.png";
import importWalletImage from "./images/argon-desktop-connect-private-key.png";
import metamaskStepA from "./images/metamask-step-a.png";
import metamaskStepBC from "./images/metamask-step-b-c.png";
import metamaskStepD from "./images/metamask-step-d.png";
import metamaskStepE from "./images/metamask-step-e.png";
import metamaskStepF from "./images/metamask-step-f.png";
</script>

<style scoped>
@reference "../../../main.css";

.SecurityWarning,
.SecurityNote {
  @apply my-6 rounded-md border px-4 py-3;
}

.SecurityWarning {
  @apply border-red-300 bg-red-50 text-red-950;
}

.SecurityNote {
  @apply border-amber-300 bg-amber-50 text-amber-950;
}

.DesktopFigure,
.KeyFigure,
.StepGrid figure {
  @apply my-6;
}

.ScreenshotFrame {
  @apply relative;
}

figure img {
  @apply block max-w-full rounded-lg border border-slate-300 bg-white shadow-md;
}

.DesktopFigure {
  @apply mb-10;
}
.DesktopFigure img {
  @apply w-full;
}

.StepGrid {
  @apply block;
}

.StepGrid img,
.KeyFigure img {
  @apply w-full max-w-112;
}

.MetaMaskFigure {
  @apply grid grid-cols-1 gap-x-8 gap-y-2 md:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] md:items-center;
}

.MetaMaskFigure .ScreenshotFrame {
  @apply max-w-112;
}

figcaption {
  @apply mt-2 text-slate-600 text-base;
}

.MetaMaskFigure figcaption {
  @apply mt-0 max-w-112 leading-relaxed;
}

.StepMarker {
  @apply absolute z-10 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-argon-800 text-sm font-bold text-white shadow-md md:size-10 md:text-base;
}

.MarkerA {
  left: 85.5%;
  top: 39%;
}

.MarkerB {
  left: 33.8%;
  top: 32.5%;
}

.MarkerC {
  left: 23%;
  top: 4%;
}

.MarkerD {
  left: 91.5%;
  top: 47.5%;
}

.MarkerE {
  left: 28%;
  top: 49.5%;
}

.MarkerF {
  left: 91%;
  top: 48%;
}

.MarkerG {
  left: 88%;
  top: 56.5%;
}

.MarkerH {
  left: 94%;
  top: 37%;
}

.MarkerI {
  left: 67%;
  top: 48%;
}

.MarkerJ {
  left: 67%;
  top: 68%;
}

.MarkerK {
  left: 67%;
  top: 74%;
}
</style>
