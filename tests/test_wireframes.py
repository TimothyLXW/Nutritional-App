"""SVG compatibility regressions. Run: python3 -m unittest discover -s tests"""
import importlib.util
from pathlib import Path
import unittest
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('prepare_wireframes', ROOT / 'scripts/prepare-wireframes.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class WireframeCompatibilityTests(unittest.TestCase):
    def test_nested_viewport_becomes_group_with_geometry_preserved(self):
        source = ET.fromstring('<svg xmlns="http://www.w3.org/2000/svg"><svg x="30" y="50" width="20" height="30" viewBox="0 0 24 24"><path d="M1 2L3 4"/></svg></svg>')
        result = module.normalize(source, root=True)
        group = result[0]
        self.assertEqual(module.local(group.tag), 'g')
        self.assertEqual(group.get('transform'), 'translate(30 50) scale(0.8333333333 1.25) translate(-0 -0)')
        self.assertEqual(group[0].get('d'), 'M1 2L3 4')

    def test_inherited_current_color_is_explicit(self):
        source = ET.fromstring('<svg xmlns="http://www.w3.org/2000/svg" color="rgb(40, 93, 70)"><g stroke="currentColor"><path stroke="currentColor" d="M1 2L3 4"/></g></svg>')
        result = module.normalize(source, root=True)
        self.assertEqual(result[0].get('stroke'), '#285d46')
        self.assertEqual(result[0][0].get('stroke'), '#285d46')

    def test_all_exported_files_have_one_root_and_no_prefixed_elements(self):
        files = list((ROOT / 'wireframes').glob('*.svg'))
        self.assertGreaterEqual(len(files), 27)
        for path in files:
            with self.subTest(path=path.name):
                content = path.read_text()
                root = ET.fromstring(content)
                self.assertEqual(sum(module.local(el.tag) == 'svg' for el in root.iter()), 1)
                self.assertNotIn('<ns0:', content)
                self.assertNotIn('currentColor', content)
                self.assertNotIn('foreignObject', content)
                self.assertGreater(sum(module.local(el.tag) == 'text' for el in root.iter()), 5)

    def test_board_contains_every_screen_as_a_group(self):
        board = ET.parse(ROOT / 'wireframes/All-Screens-Board.svg').getroot()
        groups = {el.get('id') for el in board if module.local(el.tag) == 'g'}
        expected = {p.stem for p in (ROOT / 'wireframes').glob('NutriGoal-*.svg')}
        self.assertEqual(groups, expected)
        for group in (el for el in board if module.local(el.tag) == 'g'):
            self.assertGreater(len(list(group.iter())), 20)


if __name__ == '__main__':
    unittest.main()
