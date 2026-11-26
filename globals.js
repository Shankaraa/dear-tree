// The screens were written as classic scripts that share globals (React hooks, ICON, Pill, ...).
// Keep that working under ES modules: expose React on window before any screen is evaluated.
// Contributors: new code may use normal imports and exports; this just keeps the existing files running.
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

window.React = React;
window.ReactDOM = ReactDOM;
Object.assign(window, {
  useState: React.useState, useEffect: React.useEffect, useRef: React.useRef,
  useMemo: React.useMemo, useCallback: React.useCallback,
});
