---
layout: default
title: "Posts"
permalink: /posts
---

<div class="container">
  <!-- Dropdown tag filter -->
  <div class="d-flex justify-content-between align-items-center">
      <h1>
        Posts
      </h1>
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="tagFilter" data-bs-toggle="dropdown"
          aria-expanded="false">
          Filter by
        </button>
        <ul class="dropdown-menu" aria-labelledby="tagFilter">
          <li><a class="dropdown-item" href="/posts">All</a></li>
          {% for tag in site.tags %}
          <li><a class="dropdown-item" href="/posts#{{ tag[0] }}">{{ tag[0] }}</a></li>
          {% endfor %}
        </ul>
      </div>
  </div>

  <!-- Posts -->
  <div class="row row-cols-1 row-cols-md-3 g-4">
    {% for post in site.posts %}
    <div class="col post-item {{ post.tags | join: ' ' }}">
      <div class="card h-100 select-hover">
        <img src="{{ post.card-image }}" class="card-img-top" alt="...">
        <div class="card-body">
          <a href="{{ post.url }}" class="stretched-link text-decoration-none text-dark">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">
              {{ post.description }}
            </p>
            <p class="card-text"><small class="text-body-secondary">{{ post.date | date: "%B %-d, %Y" }}</small></p>
          </a>
        </div>
      </div>
    </div>
    {% endfor %}
  </div>

</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
  $(document).ready(function () {
    // Filter posts by tag
    $(".dropdown-item").click(function () {
      var tag = $(this).attr("href").split("#")[1];
      $(".post-item").hide();
      console.log(tag);
      $("." + tag).show();
    });
  });
</script>