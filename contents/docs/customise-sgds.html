---
title: Customise SGDS with Sass
layout: layout-sidenav
permalink: /docs/customise-sgds/
---

<h2>Overview</h2>
<p>
	Use <a href="https://sass-lang.com/" target="_blank">Sass</a> to customise how
	SGDS looks and behaves in your project
</p>

<hr />

<h3>Working with SGDS's source files</h3>

<h4>If you installed sgds with NPM</h4>

<p>
	The Sass source files for sgds can be found under 
	<code>node_modules/sgds-govtech/sass</code>:
</p>

{%- highlight plaintext  -%}
site-folder/
├── scss
│   └── custom.scss
└── node_modules/
    └── sgds-govtech/sass/
        └── sgds.scss
{%- endhighlight -%}

<h4>If you manually downloaded SGDS</h4>
<p>
	If you've manually <a href="/docs/getting-started">downloaded</a> the Sass files and are not
	using a package manager, you can set up your code with the following folder structure:
</p>

{%- highlight plaintext -%}
site-folder/
├── scss
│   └── custom.scss
└── sgds/sass/
	└── sgds.scss
{%- endhighlight -%}

<hr>

<h3>Importing and overriding SGDS styles</h3>

<p>Import all styles:</p>

{% highlight scss %}
// Version 1.0.24
@charset "utf-8";

// Override SGDS defaults
$primary: black;
$secondary: darkorange;
$warning: red;

// This must be overridden if you want to use icons! See below for more details
$sgds-font-path: "../../../fonts";

// Import all of sgds
@import "../node_modules/sgds-govtech/sgds/sass/sgds.scss";

// If using Webpack
@import "~sgds-govtech/sgds/sass/sgds.scss";
{% endhighlight%}

<p>or import individual components as needed:</p>

{% highlight scss %}
@charset "utf-8";

$primary: black;
$secondary: darkorange;
$warning: red;

// This must be overridden if you want to use icons! See below for more details
$sgds-font-path: "../../../fonts";

// Required sass files
@import "../node_modules/sgds-govtech/sgds/sass/sgds-customise/all";
@import "../node_modules/sgds-govtech/sgds/sass/sgds-base/all";

// Optional
@import "../node_modules/sgds-govtech/sgds/sass/sgds-components/sgds-masthead";
@import "../node_modules/sgds-govtech/sgds/sass/sgds-components/sgds-navbar";
@import "../node_modules/sgds-govtech/sgds/sass/sgds-components/sgds-side-navigation";
@import "../node_modules/sgds-govtech/sgds/sass/sgds-components/sgds-footer";
@import "../node_modules/sgds-govtech/sgds/sass/sgds-components/sgds-button";
@import "../node_modules/sgds-govtech/sgds/sass/sgds-components/sgds-accordion";

// If using Webpack
@import "~sgds-govtech/sgds/sass/...";
{% endhighlight%}

<h4 id="font-path-override">Overriding <code>$sgds-font-path</code> to properly load icons</h4>

<div class="sgds-notification is-warning">
	<div class="sgds-notification-detail">
		<span class="sgds-icon sgds-icon-circle-info is-size-4"></span>
		<div class="sgds-notification-content">

				If you are building a single-page application (such as React or Vue)
				and use Webpack to compile your Sass files
				into inline styles (using style-loader),
				you <strong>must</strong> override
				the <code>$sgds-font-path</code> variable when importing 
				<em>all styles</em> (sgds/sass/sgds.scss) or 
				<em>sgds-icons</em> (sgds/sass/sgds-icons). Otherwise you may encounter
				a build error stating that the path to the <code>../fonts</code> folder cannot be resolved.

		</div>
	</div>
</div>
<h4>Explanation</h4>
<p>
	When importing SGDS's Sass, Webpack has to resolve its <code>fonts</code> folder
	relative to the node module's sgds-icons folder in order to load inline styles correctly.
	This usually means that you would need to point Webpack to the correct fonts folder
	manually by overriding <code>$sgds-font-path</code>. For instance, with the following
	folder structure:
</p>

{% highlight plaintext %}
node_modules/
└── sgds-govtech/
    ├── fonts/
    │   └── font files
    └── sgds/
        └── sass/
            └── sgds-icons/

{% endhighlight %}

<p>The path from <code>sgds-icons/</code> to the <code>fonts/</code> folder is
<code>../../../fonts</code>, which would be what <code>$sgds-font-path</code> must be set to.</p>

<p>For more information, see the <a href="https://webpack.js.org/loaders/sass-loader/#problems-with-url">sass-loader documentation</a></p>

<hr/>

<h3>The following default SGDS variables can be overridden:</h3>

<table class="table is-striped is-size-8">
	<thead>
		<th>Variable</th>
		<th>Default Value</th>
		<th>Type</th>
	</thead>
	<tbody>
		{% for variable_name in site.data.initial-variables %}
		<tr>
			<td width="30%">
				<code>{{ variable_name[1].name }}</code>
			</td>
			<td>
				<div class="is-flex is-flex-alignitems-c">
					{% if variable_name[1].type == 'colour' %}
					<span class="colorBox margin--right--sm is-{{
              variable_name[1].state | remove: '$'
            }}"></span>
					{% endif %}
					<code>{{ variable_name[1].value }}</code>
				</div>
			</td>
			<td width="30%">
				<a href="/docs/{{ variable_name[1].type }}">{{
          variable_name[1].type | capitalize
        }}</a>
			</td>
		</tr>
		{% endfor %}
	</tbody>
</table>