<template>
  <main class="w-[92vw] mx-auto mt-40">
    <section class="hero grid m-7" style="grid-template-columns: 1fr 1fr">
      <div class="left text-left mt-10 px-16 py-0">
        <h1 class="hero-title text-6xl font-bold mx-0 my-7">
          Need a Product? Can't find it here, Can't find it anywhere else
        </h1>
        <p class="hero-description text-xl">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos
          molestias corrupti debitis, esse, voluptas asperiores eaque ex
          cupiditate similique alias expedita dolorem voluptatibus aut suscipit
          id reprehenderit temporibus animi commodi.
        </p>
        <router-link
          to="/register"
          class="get-started-button block text-center text-white w-[150px] bg-[#5208b6] rounded-[30px] py-2 mt-8 no-underline transition-colors duration-300 hover:bg-[#8a16db]"
          >Get Started</router-link
        >
      </div>
      <div class="right p-5">
        <img
          src="@/assets/images/hero.png"
          alt="Hero Image"
          class="hero-image w-[100%] rounded-xl"
        />
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: "Hero",
};
</script>
