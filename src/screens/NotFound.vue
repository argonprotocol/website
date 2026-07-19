<template>
  <MainLayout>
    <main class="flex min-h-[calc(100vh-69px)] items-center justify-center px-5 py-20 text-center text-slate-800">
      <div class="w-full max-w-3xl">
        <div class="font-serif text-argon-600/50 text-xl font-bold tracking-widest md:text-2xl">
          404
        </div>
        <h1 class="mt-3 font-serif text-4xl leading-tight md:text-6xl lg:text-7xl">
          Page Not Found
        </h1>
        <p class="mx-auto mt-7 max-w-xl font-serif text-lg leading-relaxed text-slate-600 md:text-xl">
          The page you’re looking for doesn’t exist or may have moved.
        </p>
        <RouterLink
          to="/"
          class="mt-9 inline-flex items-center justify-center rounded-lg border border-argon-800 bg-argon-button px-7 py-3 font-bold text-white no-underline hover:bg-argon-button-hover md:text-lg"
          style="box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.5), 1px 1px 0 rgba(255, 255, 255, 1);"
        >
          Return Home
        </RouterLink>
      </div>
    </main>
  </MainLayout>
</template>
