<template>
  <div class="navbar">
    <div class="navbar-content">
      <div class="navbar-section">
        <i class="uil uil-moon" :class="[theme.accent_color]" />
      </div>
      <div class="navbar-section">
        <div class="d-flex">
          <h6 class="mr-10 m-y-auto" :class="theme.primary_color">Mr.Nickname</h6>
          <div class="avatar m-y-auto">
            <div class="image-wrapper depth-1 round-12">
              <img src="@/assets/avatar.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
