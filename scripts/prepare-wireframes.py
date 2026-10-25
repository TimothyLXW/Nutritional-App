#!/usr/bin/env python3
"""Normalize exported SVGs and assemble an import-friendly board without nested SVGs.

Run after exporting screen assets: python3 scripts/prepare-wireframes.py
Uses only Python's standard library. No rasterisation or text outlining occurs.
"""
from pathlib import Path
import copy
import re
import xml.etree.ElementTree as ET

SVG_NS = 'http://www.w3.org/2000/svg'
ET.register_namespace('', SVG_NS)
ROOT = Path(__file__).resolve().parents[1]
FOLDER = ROOT / 'wireframes'


def local(name):
    return name.rsplit('}', 1)[-1]


def color_value(value, inherited):
    value = value.replace('currentColor', inherited)
    match = re.fullmatch(r'rgb\(\s*(\d+)[, ]+\s*(\d+)[, ]+\s*(\d+)\s*\)', value)
    if match:
        return '#' + ''.join(f'{int(v):02x}' for v in match.groups())
    return value


def normalize(node, inherited_color='#000000', root=False):
    tag = local(node.tag)
    current_color = node.get('color', inherited_color)
    is_viewport = tag == 'svg' and not root
    out = ET.Element(f'{{{SVG_NS}}}{"g" if is_viewport else tag}')
    for key, value in node.attrib.items():
        key = local(key)
        if key in ('class', 'color') or key.startswith('data-'):
            continue
        if is_viewport and key in ('x', 'y', 'width', 'height', 'viewBox', 'preserveAspectRatio', 'transform'):
            continue
        value = color_value(value, current_color)
        if key == 'letter-spacing':
            value = value.removesuffix('px')
        out.set(key, value)
    if is_viewport:
        vb = [float(v) for v in re.split(r'[\s,]+', node.get('viewBox', '0 0 24 24').strip())]
        x, y = node.get('x', '0'), node.get('y', '0')
        width, height = float(node.get('width', vb[2])), float(node.get('height', vb[3]))
        transforms = [f'translate({x} {y})', f'scale({width/vb[2]:.10g} {height/vb[3]:.10g})', f'translate({-vb[0]:.10g} {-vb[1]:.10g})']
        if node.get('transform'):
            transforms.insert(0, node.get('transform'))
        out.set('transform', ' '.join(transforms))
    out.text, out.tail = node.text, node.tail
    for child in node:
        out.append(normalize(child, current_color))
    return out


def write_svg(path, element):
    path.write_text(ET.tostring(element, encoding='unicode'), encoding='utf-8')


def main():
    files = sorted(FOLDER.glob('NutriGoal-*.svg'))
    items = []
    for path in files:
        normalized = normalize(ET.parse(path).getroot(), root=True)
        write_svg(path, normalized)
        items.append((path, normalized, float(normalized.get('width')), float(normalized.get('height'))))
    column_width, columns, y = 470, 4, 130
    rows = [items[i:i+columns] for i in range(0, len(items), columns)]
    height = y + sum(max(item[3] for item in row) + 80 for row in rows)
    board = ET.Element(f'{{{SVG_NS}}}svg', {'width': '1960', 'height': str(height), 'viewBox': f'0 0 1960 {height}'})
    ET.SubElement(board, f'{{{SVG_NS}}}rect', {'width': '1960', 'height': str(height), 'fill': '#edf0e9'})
    def text(x, top, label, size, weight='400'):
        el = ET.SubElement(board, f'{{{SVG_NS}}}text', {'x': str(x), 'y': str(top), 'font-family': 'Arial', 'font-size': str(size), 'font-weight': weight, 'fill': '#285d46'})
        el.text = label
    text(50, 55, 'NutriGoal AI — Screen collection', 30, '700')
    text(50, 85, 'Static wireframes · Demo data · Import individual SVGs to refine each screen', 14)
    for row in rows:
        for column, (path, screen, width, screen_height) in enumerate(row):
            x = 50 + column * column_width
            label = path.stem.removeprefix('NutriGoal-').replace('-', ' ')
            text(x, y-15, label, 14, '600')
            group = ET.SubElement(board, f'{{{SVG_NS}}}g', {'id': path.stem, 'transform': f'translate({x} {y})'})
            for child in screen:
                group.append(copy.deepcopy(child))
        y += max(item[3] for item in row) + 80
    write_svg(FOLDER / 'All-Screens-Board.svg', board)
    # Structural compatibility checks: only the root is SVG and no prefixed tags.
    for path in [*files, FOLDER / 'All-Screens-Board.svg']:
        content = path.read_text()
        parsed = ET.fromstring(content)
        assert all(local(el.tag) != 'svg' for el in list(parsed.iter())[1:]), path
        assert '<ns0:' not in content and 'currentColor' not in content, path
        assert any(local(el.tag) == 'text' for el in parsed.iter()), path
    print(f'Normalized {len(files)} screen SVGs and rebuilt the overview board; structural checks passed.')


if __name__ == '__main__':
    main()
