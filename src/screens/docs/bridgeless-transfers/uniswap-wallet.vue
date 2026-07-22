<template>
  <DocHeader>
    Connect a Uniswap Wallet
  </DocHeader>
  <DocContent>
    <p>
      Argon Desktop can connect to an Ethereum account from the Uniswap Wallet browser extension using its recovery
      phrase. Once connected, you can use the account with Argon's bridgeless transfer features.
    </p>

    <aside class="SecurityWarning">
      <strong>Protect your recovery phrase.</strong>
      Anyone who has it can access your wallet and its funds. Only enter it directly into Argon Desktop on a device you
      trust. Never send it to another person, website, support representative, or chat.
    </aside>

    <h2>Start In Argon Desktop</h2>
    <p class="mt-2">
      Open your Argon Desktop app and from the Account Overview screen click <strong>Connect Ethereum Wallet</strong>
      (<strong>see A</strong>).
    </p>

    <figure class="DesktopFigure AnnotatedFigure ConnectFigure">
      <div class="ScreenshotFrame">
        <img :src="connectWalletImage" alt="Connect Ethereum Wallet on the Argon Desktop Account Overview" />
        <span class="StepMarker MarkerA" aria-hidden="true">A</span>
      </div>
    </figure>

    <p>
      In the overlay that appears, select <strong>Mnemonic</strong> (see <strong>B</strong>). Keep this window open while
      you retrieve the recovery phrase from Uniswap Wallet.
    </p>

    <figure class="DesktopFigure AnnotatedFigure ImportFigure">
      <div class="ScreenshotFrame">
        <img :src="mnemonicWalletImage" alt="Mnemonic import method in the Connect Ethereum Wallet overlay" />
        <span class="StepMarker MarkerB" aria-hidden="true">B</span>
      </div>
    </figure>

    <h2 class="mt-5">Switch to Your Uniswap Wallet Browser Extension</h2>

    <p class="mt-2">
      Open the browser that holds your Uniswap Wallet extension. Make sure you are viewing the wallet you want to
      connect to Argon Desktop.
    </p>

    <div class="StepList">
      <figure class="AnnotatedFigure ExtensionFigure SettingsFigure">
        <div class="ScreenshotFrame">
          <img :src="uniswapStepA" alt="Uniswap Wallet browser extension home screen" />
          <span class="StepMarker MarkerC" aria-hidden="true">C</span>
        </div>
        <figcaption>Click the settings icon in the upper-right corner (see <strong>C</strong>).</figcaption>
      </figure>

      <figure class="AnnotatedFigure ExtensionFigure RecoveryPhraseFigure">
        <div class="ScreenshotFrame">
          <img :src="uniswapStepB" alt="Uniswap Wallet settings with Recovery phrase" />
          <span class="StepMarker MarkerD" aria-hidden="true">D</span>
        </div>
        <figcaption>Under Privacy and security, click <strong>Recovery phrase</strong> (see <strong>D</strong>).</figcaption>
      </figure>

      <figure class="AnnotatedFigure ExtensionFigure RecoveryWarningFigure">
        <div class="ScreenshotFrame">
          <img :src="uniswapStepC" alt="Uniswap Wallet recovery phrase notice" />
          <span class="StepMarker MarkerE" aria-hidden="true">E</span>
        </div>
        <figcaption>Read the recovery phrase notice, then click <strong>Continue</strong> (see <strong>E</strong>).</figcaption>
      </figure>

      <figure class="AnnotatedFigure ExtensionFigure PasswordFigure">
        <div class="ScreenshotFrame">
          <img :src="uniswapStepD" alt="Uniswap Wallet password confirmation" />
          <span class="StepMarker MarkerF" aria-hidden="true">F</span>
        </div>
        <figcaption>Enter your Uniswap Wallet password and click <strong>Continue</strong> (see <strong>F</strong>).</figcaption>
      </figure>

      <figure class="AnnotatedFigure ExtensionFigure CopyPhraseFigure">
        <div class="ScreenshotFrame">
          <img :src="uniswapStepE" alt="Uniswap Wallet recovery phrase with Copy button" />
          <span class="StepMarker MarkerG" aria-hidden="true">G</span>
        </div>
        <figcaption>Click <strong>Copy</strong> above the recovery phrase (see <strong>G</strong>).</figcaption>
      </figure>
    </div>

    <h2 class="pt-5">Finish In Argon Desktop</h2>

    <p class="mt-2">
      Return to the Connect Ethereum Wallet overlay previously opened in Argon Desktop, and paste the copied recovery
      phrase into the mnemonic field (see <strong>H</strong>). Then click <strong>Load Wallets From Mnemonic</strong>
      (see <strong>I</strong>).
    </p>

    <figure class="DesktopFigure AnnotatedFigure ImportFigure FinishMnemonicFigure">
      <div class="ScreenshotFrame">
        <img :src="mnemonicWalletImage" alt="Mnemonic field and Load Wallets From Mnemonic button in Argon Desktop" />
        <span class="StepMarker MarkerH" aria-hidden="true">H</span>
        <span class="StepMarker MarkerI" aria-hidden="true">I</span>
      </div>
    </figure>

    <p>
      Select the account you want to connect (see <strong>J</strong>). Enter a recognizable name for the wallet (see
      <strong>K</strong>), then click <strong>Import Wallet</strong> (see <strong>L</strong>).
    </p>

    <figure class="DesktopFigure AnnotatedFigure SelectAccountFigure">
      <div class="ScreenshotFrame">
        <img :src="selectAccountImage" alt="Select an Ethereum account and name it in Argon Desktop" />
        <span class="StepMarker MarkerJ" aria-hidden="true">J</span>
        <span class="StepMarker MarkerK" aria-hidden="true">K</span>
        <span class="StepMarker MarkerL" aria-hidden="true">L</span>
      </div>
    </figure>

    <aside class="SecurityNote">
      After connecting, remove the recovery phrase from your clipboard by copying some harmless text. Do not save the
      phrase in notes, screenshots, email, cloud storage, or an unencrypted file.
    </aside>
  </DocContent>
</template>

<script setup lang="ts">
import DocContent from "@/screens/docs/DocContent.vue";
import DocHeader from "@/screens/docs/DocHeader.vue";
import connectWalletImage from "./images/argon-desktop.png";
import mnemonicWalletImage from "./images/argon-desktop-connect-mnemonic.png";
import selectAccountImage from "./images/argon-desktop-select-account.png";
import uniswapStepA from "./images/uniswap-step-a.png";
import uniswapStepB from "./images/uniswap-step-b.png";
import uniswapStepC from "./images/uniswap-step-c.png";
import uniswapStepD from "./images/uniswap-step-d.png";
import uniswapStepE from "./images/uniswap-step-e.png";
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
.StepList figure {
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

.StepList {
  @apply block;
}

.StepList img {
  @apply w-full max-w-114;
}

.ExtensionFigure {
  @apply grid grid-cols-1 gap-x-8 gap-y-2 md:grid-cols-[minmax(0,28.5rem)_minmax(0,1fr)] md:items-center;
}

.ExtensionFigure .ScreenshotFrame {
  @apply max-w-114;
}

figcaption {
  @apply mt-2 text-base text-slate-600;
}

.ExtensionFigure figcaption {
  @apply mt-0 max-w-114 leading-relaxed;
}

.StepMarker {
  @apply absolute z-10 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-argon-800 text-sm font-bold text-white shadow-md md:size-10 md:text-base;
}

.MarkerA {
  left: 85.5%;
  top: 39%;
}

.MarkerB {
  left: 66%;
  top: 32%;
}

.MarkerC {
  left: 99%;
  top: 11%;
}

.MarkerD {
  left: 91%;
  top: 69%;
}

.MarkerE {
  left: 89%;
  top: 94%;
}

.MarkerF {
  left: 92%;
  top: 68%;
}

.MarkerG {
  left: 66%;
  top: 20%;
}

.MarkerH {
  left: 65%;
  top: 48%;
}

.MarkerI {
  left: 65%;
  top: 65.5%;
}

.MarkerJ {
  left: 36.5%;
  top: 35%;
}

.MarkerK {
  left: 67%;
  top: 69.5%;
}

.MarkerL {
  left: 67%;
  top: 75.5%;
}
</style>
