---
title: Modal
layout: layout-docs
category: General
---

{% capture card-modal %}
<!-- You can change the modal width using .sgds-modal.is-small, .sgds-modal.is-large or .sgds-modal.is-fullwidth -->
<div class="sgds-modal" id="default-modal" aria-labelledby="sgds-modal-title" role="dialog">
    <div class="sgds-modal-background"></div>
    
    <div class="sgds-modal-card">
        <header class="sgds-modal-card-head">
            <p class="sgds-modal-card-title" id="sgds-modal-title">{{site.title}}</p>
            <button class="delete" aria-label="close"></button>
        </header>
        <section class="sgds-modal-card-body">
            <p>{{site.description}}</p>
            <p>Make a decision:</p>
            <button type="button" class="sgds-button">Yes</button>
            <button type="button" class="sgds-button">No</button>
        </section>
        <footer class="sgds-modal-card-foot is-flex-justify-fe">
            <button class="sgds-button is-text">Cancel</button>
            <button class="sgds-button is-success">Save</button>
        </footer>
    </div>
</div>
{% endcapture %}

{% capture image-modal %}
<div class="sgds-modal" id="image-modal" aria-label="Image caption here" role="dialog">
    <div class="sgds-modal-background"></div>
    <div class="sgds-modal-content">
        <img src="https://placehold.it/1280x720/" alt="placeholder image">
    </div>
    <button class="sgds-modal-close is-large" aria-label="close"></button>
</div>
{% endcapture %}

<h2>Overview</h2>
<p>
    The modal component inform users about a specific task and may contain critical information,
    require decisions, or involve multiple tasks.
</p>

<hr/>

<h3>Behaviour</h3>

<ul>
    <li>
        Modal width can be changed by via the following classes:
        <code>.sgds-modal.is-small</code>, <code>.sgds-modal.is-large</code>
        or <code>.sgds-modal.is-fullwidth</code>.
    </li>
    <li>
        Always include <code>&lt;div class="sgds-modal-background"&gt;</code>
        inside the .sgds-modal container for the modal overlay.
    </li>
</ul>

<h3>Examples</h3>

<h4>1) Default modal</h4>
<div class="sgds-example-others">
    {{ card-modal }}
    <button class="sgds-button is-primary is-outlined modal-button" data-target="default-modal">Launch modal</button>
</div>
{%- highlight html -%}{{ card-modal }}{%- endhighlight -%}
<button class="sgds-button clipboard-btn is-primary is-outlined"
    data-clipboard-target='.highlight0'>Copy snippet</button>

<hr>

<h4>2) Image modal</h4>
<div class="sgds-example-others">
    {{ image-modal }}
    <button class="sgds-button is-primary is-outlined modal-button" data-target="image-modal">Launch modal</button>
</div>
{%- highlight html -%}{{ image-modal }}{%- endhighlight -%}
<button class="sgds-button clipboard-btn is-primary is-outlined"
    data-clipboard-target='.highlight0'>Copy snippet</button>

<hr>

<h3>Interactivity with JavaScript</h3>

<p>
    SGDS does not provide interactivity for modals out of the box, 
    so here's how you can implement modal opening
    and closing behaviour:
</p>

<p>

    Modals are hidden (display: none) by default, and appear (display: flex)
    when you attach the 
    <code>.is-active</code> class
    on the wrapping <code>.sgds-modal</code> container. For example, to show a modal:
</p>

{% highlight html %}
<script>
    document.querySelector(".sgds-modal").classList.add("is-active");
</script>
{% endhighlight %}

<p>
    Similarly, to close a modal, simply remove the <code>.is-active</code> class from the
    wrapping <code>.sgds-modal</code> element.
</p>

<hr />

<h3>Style</h3>
<table class="table">
    <thead>
    <tr>
        <th>Modifier</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>sgds-modal is-active</code></td>
            <td>
                <p>Set the modal to display: flex</p>
                <small>(default value is display: none)</small>
            </td>
        </tr>
        <tr>
            <td><code>sgds-modal is-small</code></td>
            <td>
                <p>Set the modal width to 30vw (viewport width)</p>
            </td>
        </tr>
        <tr>
            <td><code>sgds-modal is-large</code></td>
            <td>
                <p>Set the modal width to 70vw (viewport width)</p>
            </td>
        </tr>
        <tr>
            <td><code>sgds-modal is-fullwidth</code></td>
            <td>
                <p>Set the modal width to 95vw (viewport width)</p>
            </td>
        </tr>
    </tbody>
</table>

<hr>

<h3>When to use</h3>

<h6>Modals should be used when:</h6>
<ul>
    <li>
        You want to interrupt a user’s current task to direct 
        the user’s attention to something important.
        For example, confirming when a user wants to submit a form, 
        user sign up and login,        
        or highlighting an important event with an infographic upon entering your website.
    </li>
</ul>

<h6>Modals should not be used when:</h6>
<ul>
    <li>
        You need to present simple notifications to the user.
        It should always accompany something actionable by the user
        such as confirming or filling in a form.
        If you need to notifiy the user or something important,
        use something less intrusive such as
        the <a href="/docs/notification">notification</a> component instead.
    </li>
</ul>

<hr />

{%- include sgds-feedback.html -%}

<script>
    function getAll(selector) 
    {
        let parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
        return Array.prototype.slice.call(parent.querySelectorAll(selector), 0);
    }

    let $modals = getAll('.sgds-modal');
    let $modalButtons = getAll('.modal-button');
    let $modalCloses = getAll('.sgds-modal-background, .sgds-modal-close, .sgds-modal-card-head .delete, .sgds-modal-card-foot .sgds-button');

    if ($modalButtons.length > 0) {
        $modalButtons.forEach(function ($el) {
            $el.addEventListener('click', function () {
                let target = $el.dataset.target;
                openModal(target);
            });
        });
    }

    if ($modalCloses.length > 0) {
        $modalCloses.forEach(function ($el) {
            $el.addEventListener('click', function () {
                closeModals();
            });
        });
    }

    function openModal(target) {
        let $target = document.getElementById(target);
        $target.classList.add('is-active');
    }

    function closeModals() {
        $modals.forEach(function ($el) {
            $el.classList.remove('is-active');
        });
    }
</script>
