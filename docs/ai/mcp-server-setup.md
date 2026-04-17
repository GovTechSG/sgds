---
layout: docs
title: MCP server setup
description: Connect Figma to Claude Code and turn your designs into working SGDS code automatically.
headerAlert:
  description: This AI section is still being developed. Please treat the content as contextual guidance only, as information may be largely incomplete and inaccurate at the time of reading.
  variant: danger
  icon: exclamation-circle-fill
---

## What is this?

The Figma MCP Server lets Claude Code read your Figma designs directly — so instead of describing what you want to build, the AI can simply look at your design and generate the code for you using SGDS components and utilities.

> **Best results** come from designs built with the SGDS Figma library.

## Before you start

Make sure you have the following ready:

- **Claude Code** installed and configured
- **Figma Dev Mode MCP server plugin** set up and running locally
- **SGDS agent skills** installed — run `npx skills add govtechsg/sgds-web-component`
- **SGDS web component package** installed — run `npm i @govtechsg/sgds-web-component`

## Setup

### 1. Connect Claude Code to the Figma MCP server

Run this command in your terminal:

<CopyCommand command="claude mcp add --transport sse figma-dev-mode-mcp-server http://127.0.0.1:3845/sse" />

Make sure the Figma Dev Mode MCP server plugin is already running before you do this.

### 2. Select your frame in Figma

Open your Figma file and click on the frame you want to build. It should be a complete section or page layout — ideally designed using the SGDS Figma library.

### 3. Prompt the agent

Use this as a starting point:

> *"Build this Figma frame using SGDS web components and utility classes. Refer to the SGDS skills for the correct component APIs, utility tokens, and layout patterns."*
