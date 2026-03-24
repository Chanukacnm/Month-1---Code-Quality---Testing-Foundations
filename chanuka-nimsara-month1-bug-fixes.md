# Bug Fixes Documentation

## Bug #1: Button `onClick` called when `disabled`
- **Location:** `src/components/Button/Button.tsx:23`
- **Symptom:** The `onClick` handler fires even when the button is set to `disabled={true}`. Clicking a disabled button shouldn't submit or calculate logic.
- **Root Cause:** The `onClick={onClick}` prop was passed directly to the native `<button>` element regardless of the `disabled` prop state.
- **Test Written:** "respects disabled prop" inside `Button.test.tsx` checking that `handleClick` is not invoked.
- **Fix Applied:** Adjusted native element prop to: `onClick={disabled || loading ? undefined : onClick}`.

## Bug #2: Input generating duplicate DOM IDs (Accessibility)
- **Location:** `src/components/Input/Input.tsx` (ID fallback logic)
- **Symptom:** If multiple `<Input>` components are instantiated without a `label`, they would all fallback to `id=undefined`. The error strings (`aria-describedby`) would target the same repeated DOM `<span id="undefined-error">`, breaking ARIA rules severely.
- **Root Cause:** Lack of robust unique ID generation.
- **Test Written:** Checked missing label behavior gracefully fallback ("handles gracefully when no label is provided...").
- **Fix Applied:** Integrated React 18's `useId()` hook to always compute a globally unique deterministic id for every `Input` instance natively.

## Bug #3: Toggle missing Event Handler firing
- **Location:** `src/components/Toggle/Toggle.tsx:22`
- **Symptom:** When a user toggles the UI switch, the visual state changes but no callback event propagates to the parent application.
- **Root Cause:** The internal `handleClick` was modifying internal UI state but completely forgot to invoke the passed `onChange` boundary prop.
- **Test Written:** "toggles state on click and calls onChange" inside `Toggle.test.tsx`.
- **Fix Applied:** Modified `handleClick` to explicitly call `onChange?.(!isChecked)`.

## Bug #4: Dropdown not tracking visually selected state
- **Location:** `src/components/Dropdown/Dropdown.tsx` (Select tracking)
- **Symptom:** In an uncontrolled mode, picking an item from the menu successfully closes the dropdown, but the selected label fails to appear on the UI button.
- **Root Cause:** The component was unconditionally sourcing its label identity exclusively from the `value` prop. It lacked an internal `useState` fallback logic.
- **Test Written:** "selects an item and calls onChange" verifying the `Dropdown` text correctly mirrors internal update.
- **Fix Applied:** Introduced `internalValue` tracking and `currentValue` derived logic.

## Bug #5: Tabs propagating off-by-one indices
- **Location:** `src/components/Tabs/Tabs.tsx:18`
- **Symptom:** Clicking the 1st tab correctly selects `activeIndex = 0` inside but `onChange` fires with the value `1`, breaking strictly-zero-indexed paginations around the app.
- **Root Cause:** The function explicitly passed `onChange?.(index + 1)`. 
- **Test Written:** "switches tabs and calls onChange with correct index".
- **Fix Applied:** Altered the call to send the authentic active tab: `onChange?.(index);`.

## Bug #6: Modal crashing due to missing callback check
- **Location:** `src/components/Modal/Modal.tsx:14`
- **Symptom:** If a developer omits the `onClose` callback in JS logic, pushing the `Escape` key crashes the application DOM cleanly.
- **Root Cause:** Native event listener blindly invoked `onClose()` missing standard optional chaining constraints (`?.`).
- **Test Written:** "does not crash if onClose is undefined (missing null check)".
- **Fix Applied:** Modified inside the effect: `onClose?.()`.
