#!/usr/bin/env python3
"""
Analyze a React codebase to identify components and their tests.
Outputs a JSON mapping of components → tests → used UI components.
"""

import os
import json
import re
from pathlib import Path
from typing import Dict, List, Set

def find_components(src_dir: str) -> Dict[str, str]:
    """Find all React component files (.tsx, .jsx) and their content."""
    components = {}
    src_path = Path(src_dir)

    for file in src_path.rglob("*.tsx"):
        if "__tests__" in str(file) or ".spec." in str(file) or ".test." in str(file):
            continue
        try:
            with open(file, 'r') as f:
                content = f.read()
                components[str(file.relative_to(src_path))] = content
        except Exception as e:
            print(f"Warning: Could not read {file}: {e}")

    return components

def find_test_files(root_dir: str) -> Dict[str, str]:
    """Find all test files and their content."""
    tests = {}
    root_path = Path(root_dir)

    patterns = ["**/*.spec.tsx", "**/*.spec.ts", "**/*.test.tsx", "**/*.test.ts"]

    for pattern in patterns:
        for file in root_path.glob(pattern):
            try:
                with open(file, 'r') as f:
                    content = f.read()
                    tests[str(file.relative_to(root_path))] = content
            except Exception as e:
                print(f"Warning: Could not read {file}: {e}")

    return tests

def extract_ui_components(code: str) -> Set[str]:
    """Extract UI component names used in JSX."""
    # Pattern to match JSX tags (Capital letter start)
    jsx_pattern = r'<([A-Z][a-zA-Z0-9]*)'
    matches = re.findall(jsx_pattern, code)

    # Filter out custom components (keep common lib components)
    common_libs = {
        'Button', 'Input', 'Checkbox', 'Select', 'Radio', 'Card', 'Modal',
        'Dropdown', 'Menu', 'Tabs', 'Table', 'Pagination', 'Alert', 'Toast',
        'Spinner', 'Badge', 'Chip', 'TextField', 'FormControl', 'Label',
        'Divider', 'Drawer', 'Tooltip', 'Popover', 'Container', 'Grid',
        'Stack', 'Box', 'Text', 'Heading', 'Link', 'Icon', 'Avatar',
        'Progress', 'Slider', 'Switch', 'Stepper'
    }

    return set(m for m in matches if m in common_libs)

def map_components_to_sgds(component: str) -> str:
    """Map React component name to SGDS web component."""
    mapping = {
        'Button': 'sgds-button',
        'Input': 'sgds-input',
        'Checkbox': 'sgds-checkbox',
        'Radio': 'sgds-radio',
        'Select': 'sgds-select',
        'Card': 'sgds-card',
        'Modal': 'sgds-modal',
        'Alert': 'sgds-alert',
        'Tabs': 'sgds-tab',
        'Table': 'sgds-table',
        'Spinner': 'sgds-spinner',
        'Badge': 'sgds-badge',
        'Dropdown': 'sgds-dropdown',
        'Divider': 'sgds-divider',
        'Icon': 'sgds-icon',
        'Toast': 'sgds-toast',
        'Tooltip': 'sgds-tooltip',
        'Switch': 'sgds-switch',
        'Stepper': 'sgds-stepper',
    }
    return mapping.get(component, None)

def find_component_tests(test_content: str, component_names: List[str]) -> Set[str]:
    """Find which components are tested in a test file."""
    tested = set()
    for comp in component_names:
        # Look for imports or usage of the component
        patterns = [
            rf'import.*{comp}.*from',
            rf'<{comp}[\s/>]',
            rf'render\(<{comp}',
        ]
        if any(re.search(p, test_content) for p in patterns):
            tested.add(comp)
    return tested

def main(src_dir: str, tests_dir: str = None):
    if tests_dir is None:
        tests_dir = src_dir

    print("🔍 Analyzing React codebase...\n")

    components = find_components(src_dir)
    tests = find_test_files(tests_dir)

    print(f"Found {len(components)} React components")
    print(f"Found {len(tests)} test files\n")

    # Build analysis
    analysis = {
        "components": {},
        "component_map": {},
        "sgds_candidates": {},
    }

    # Extract UI components used in each source file
    for comp_path, comp_code in components.items():
        ui_comps = extract_ui_components(comp_code)
        if ui_comps:
            analysis["components"][comp_path] = list(ui_comps)

    # Map to SGDS
    all_ui_comps = set()
    for comps_list in analysis["components"].values():
        all_ui_comps.update(comps_list)

    for comp in all_ui_comps:
        sgds = map_components_to_sgds(comp)
        if sgds:
            analysis["component_map"][comp] = sgds
            analysis["sgds_candidates"][sgds] = {
                "react_original": comp,
                "used_in": [path for path, comps in analysis["components"].items() if comp in comps],
                "tested_by": []
            }

    # Find which tests cover each component
    for test_path, test_code in tests.items():
        for sgds_comp, info in analysis["sgds_candidates"].items():
            react_comp = info["react_original"]
            if react_comp in extract_ui_components(test_code):
                info["tested_by"].append(test_path)

    # Print summary
    print("📊 Component Summary:")
    print(f"  Total UI components: {len(all_ui_comps)}")
    print(f"  SGDS candidates: {len(analysis['sgds_candidates'])}\n")

    print("🎯 Components to Migrate:")
    for sgds, info in analysis["sgds_candidates"].items():
        print(f"  {info['react_original']} → {sgds}")
        print(f"    Used in: {len(info['used_in'])} file(s)")
        print(f"    Tested by: {len(info['tested_by'])} test file(s)")
        if info['tested_by']:
            for test in info['tested_by']:
                print(f"      - {test}")
        print()

    # Output JSON for further processing
    output_path = "component_migration_plan.json"
    with open(output_path, 'w') as f:
        json.dump(analysis, f, indent=2)

    print(f"✅ Analysis saved to {output_path}")
    return analysis

if __name__ == "__main__":
    import sys
    src = sys.argv[1] if len(sys.argv) > 1 else "./src"
    main(src)
