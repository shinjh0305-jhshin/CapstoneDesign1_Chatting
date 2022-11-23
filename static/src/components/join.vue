<template>
  <div class="container p-5">
    <div class="mb-4 bg-light rounded-3" id="join-box">
      <h1 class="mb-5">Join</h1>
      <form>
        <div class="mb-2 row">
          <div class="col-sm-8 w-100">
            <input
              name="name"
              class="form-control"
              placeholder="Name"
              type="text"
              required
            />
          </div>
        </div>
        <div class="mb-2 row">
          <div class="col-sm-8 w-100">
            <input
              name="email"
              class="form-control"
              placeholder="Email"
              type="email"
              required
            />
          </div>
        </div>
        <div class="mb-2 row">
          <div class="col-sm-8 w-100">
            <input
              name="password"
              class="form-control"
              placeholder="Password"
              type="password"
              required
            />
          </div>
        </div>
        <div class="mb-2 row">
          <div class="col-sm-8 w-100">
            <input
              name="password2"
              class="form-control"
              placeholder="Confirm password"
              type="password"
              required
            />
          </div>
        </div>
        <button type="button" class="btn btn-danger w-100" @click="submit">
          Join
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "JoinPrompt",
  computed: {
    console: () => console,
    window: () => window,
  },
};
</script>

<style>
#join-box {
  padding: 5% 30% 5% 30%;
}
</style>
