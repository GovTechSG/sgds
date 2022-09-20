import sanitizeHtml from "sanitize-html";
import axios from "axios";
import config from "./config";

export const emailRegex =
  config.nodeEnv === "production"
    ? /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(\w+.)*gov\.sg$/
    : /.*/;

export const urlRegex = /^https?:\/\/[^\s/$.?#].[^\s]*$/;
export const otpRegex = /^\d{6}$/;

export function sanitize(html) {
  return sanitizeHtml(html, {
    allowedTags: [
      ...sanitizeHtml.defaults.allowedTags, // Check https://www.npmjs.com/package/sanitize-html
      "h1",
      "h2",
      "u", // Allow underlined content
      "img", // Allow img tags
      "span", // Allow span tags
    ],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      iframe: ["src"], // Allow videos
      span: ["style"], // Allow text/background color
    },
    allowedIframeHostnames: ["www.youtube.com", "player.vimeo.com"],
  });
}

export function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

export const apiClient = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
});

export function detectFormErrors({ form, fields = [] }) {
  let formFields = fields.length === 0 ? Object.keys(form) : fields;
  let errors = {};
  formFields.forEach(field => {
    if (!form[field] || form[field] === "") {
      errors[field] = "Please enter a valid value.";
    } else {
      errors[field] = "";
    }
  });
  return errors;
}

export function hasErrors(errors) {
  return Object.values(errors).reduce((prev, curr) => {
    return (curr != null && curr !== "") || prev;
  }, false);
}

export function isQueryEmpty(string) {
  return /^\s*$/.test(string.replace(/[\u200B-\u200D\uFEFF]/g, ""));
}
