# SGDS Datepicker Component Skill

`<sgds-datepicker>` combines a text input with a calendar dropdown. Users can type a date directly or pick one from the calendar. `mode="range"` enables two-date selection.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- When users need to select a specific calendar date (e.g. appointment, event date, date of birth).
- For date range selection where a start and end date are both required — use `mode="range"`.
- When both typed entry and a visual calendar picker are acceptable input methods.
- When date constraints apply (e.g. minimum or maximum selectable dates, blocked-out dates).

### When NOT to use
- For simple or approximate inputs (e.g. "Next week")
- When users need to input only month or year → consider dropdowns
- For very long date ranges (years/decades) → consider alternative inputs
- When speed is critical and typing is faster (e.g. expert/internal tools)

## Behaviour

**Input**
- Supports both manual text entry and calendar selection
- Validates format and rejects invalid dates (e.g. 31 Feb)

**Calendar**
- Opens on input focus or icon click
- Displays current month by default with month/year navigation
- Highlights selected date, today's date, and disabled/unavailable dates

**Range selection**
- First click sets the start date; second click sets the end date
- Visual range highlight shown between selected dates

**Validation feedback placement**
- `hintText` and the error message occupy the same space below the input — when the field is invalid, `hintText` is replaced by the error message. Once the error is resolved, `hintText` reappears.

## Advanced Considerations

**Accessibility** — ensure proper label association; announce selected date, focused date, and disabled dates; use `role="grid"` for the calendar; provide meaningful keyboard navigation

**Date constraints** — support `minDate` / `maxDate`, disabled ranges, and business rules (e.g. weekdays only)

**Localisation** — adapt date format (DD/MM/YYYY), first day of week, and month/day names; ensure consistency across the system

## Edge Cases

- **Invalid manual input** — handle gracefully with validation and formatting correction
- **Leap years** — ensure 29 Feb is correctly handled
- **Timezone differences** — be explicit if the date is local or system-based
- **Range errors** — if end date is before start date, auto-correct or prompt an error
- **Clearing values** — provide a clear reset/clear option
- **Pre-filled values** — ensure correct formatting and visibility on initial render
- **Very long ranges** — provide faster navigation (year dropdown or jump controls)
- **Partial input** — avoid aggressive auto-correction that may confuse users

## Quick Decision Guide

**Single date?** → `mode="single"` (default)

**Date range?** → `mode="range"`

**Pre-set a date?** → `value="22/12/2023"` for single, `value="01/01/2024 - 31/01/2024"` for range

**Restrict selectable dates?** → `minDate` and `maxDate` (ISO date strings)

**Calendar opens upward?** → `drop="up"`

**Show validation feedback?** → Set `hasFeedback` and `invalidFeedback`

```html
<!-- Basic single date picker -->
<sgds-datepicker
  label="Date of Birth"
  name="dob"
  hintText="Select your date of birth"
></sgds-datepicker>

<!-- Pre-set value -->
<sgds-datepicker
  label="Appointment Date"
  name="appointmentDate"
  value="22/12/2024"
></sgds-datepicker>

<!-- Date range with min/max constraints -->
<sgds-datepicker
  label="Leave Period"
  name="leavePeriod"
  mode="range"
  minDate="2024-01-01T00:00:00.000Z"
  maxDate="2024-12-31T00:00:00.000Z"
  hintText="Select your leave start and end dates"
></sgds-datepicker>

<!-- With validation, calendar opens upward -->
<sgds-datepicker
  label="Submission Deadline"
  name="deadline"
  required
  hasFeedback
  invalidFeedback="Please select a valid date"
  drop="up"
></sgds-datepicker>

<!-- Listen to date change -->
<sgds-datepicker id="my-date" label="Event Date" name="eventDate"></sgds-datepicker>
<script>
  document.getElementById("my-date").addEventListener("sgds-change-date", e => {
    const dateString = e.target.value; // e.g. "22/12/2024"
    console.log("Selected date:", dateString);
  });
</script>
```

## API Summary

### `<sgds-datepicker>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `label` | string | `""` | Field label |
| `hintText` | string | `""` | Hint text below the label |
| `name` | string | — | Form field name |
| `value` | string | `""` | Date string in DD/MM/YYYY format (single) or `"DD/MM/YYYY - DD/MM/YYYY"` (range) |
| `mode` | `single \| range` | `single` | Date selection mode |
| `minDate` | string | `""` | ISO date string for the earliest selectable date (e.g. `"2020-01-01T00:00:00.000Z"`) |
| `maxDate` | string | `""` | ISO date string for the latest selectable date |
| `required` | boolean | `false` | Makes the field required |
| `disabled` | boolean | `false` | Disables the datepicker |
| `hasFeedback` | boolean | `false` | Enables validation feedback UI |
| `invalidFeedback` | string | — | Error message when the date is invalid |
| `drop` | `up \| down` | `down` | Calendar dropdown direction |
| `noFlip` | boolean | `false` | Prevents the calendar from auto-flipping direction |
| `displayDate` | Date | — | JS Date object to control the month displayed in the calendar |

> **Deprecated:** `initialValue` (array format) is replaced by `value` since v3.3.0.

## Events

| Event | When |
|---|---|
| `sgds-change-date` | Date is selected, cleared, or changed (read `event.target.value` for the date string) |

---

**For AI agents**:
1. `value` format is always DD/MM/YYYY for single; `"DD/MM/YYYY - DD/MM/YYYY"` for range.
2. Access the selected date via `event.target.value` on `sgds-change-date` — there is no `event.detail`.
3. `minDate` and `maxDate` must be ISO 8601 strings (e.g. `"2020-01-01T00:00:00.000Z"`).
4. Use `drop="up"` when the datepicker is near the bottom of the viewport so the calendar opens upward.
5. There are no public methods on this component.
