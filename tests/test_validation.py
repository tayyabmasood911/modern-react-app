import os
import unittest
import json

class TestModernReactApp(unittest.TestCase):
    def setUp(self):
        self.root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

    def test_core_files_exist(self):
        required = [
            "README.md",
            "Makefile",
            "SECURITY.md",
            ".gitattributes",
            "package.json",
            "tsconfig.json",
            "vite.config.ts",
            "tailwind.config.js",
            "postcss.config.js",
            "index.html",
            "Dockerfile",
            "nginx.conf",
            "src/App.tsx",
            "src/main.tsx",
            "src/index.css",
            "docs/architecture.svg",
            ".github/workflows/ci.yml"
        ]
        for f in required:
            p = os.path.join(self.root, f)
            self.assertTrue(os.path.exists(p), f"Required file '{f}' must exist")

    def test_package_json_dependencies(self):
        with open(os.path.join(self.root, "package.json"), "r", encoding="utf-8") as f:
            pkg = json.load(f)
        deps = pkg.get("dependencies", {})
        dev_deps = pkg.get("devDependencies", {})
        
        self.assertIn("react", deps)
        self.assertIn("react-dom", deps)
        self.assertIn("vite", dev_deps)
        self.assertIn("typescript", dev_deps)
        self.assertIn("tailwindcss", dev_deps)

    def test_dockerfile_multi_stage(self):
        with open(os.path.join(self.root, "Dockerfile"), "r", encoding="utf-8") as f:
            content = f.read()
        self.assertIn("FROM node:20-alpine AS builder", content)
        self.assertIn("FROM nginx:1.27-alpine-slim AS runner", content)
        self.assertIn("USER nginx", content)

    def test_nginx_conf_security_headers(self):
        with open(os.path.join(self.root, "nginx.conf"), "r", encoding="utf-8") as f:
            content = f.read()
        self.assertIn('X-Frame-Options "DENY"', content)
        self.assertIn("try_files $uri $uri/ /index.html;", content)
        self.assertIn("location /healthz", content)

    def test_gitattributes_content(self):
        path = os.path.join(self.root, ".gitattributes")
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        self.assertIn("* text=auto eol=lf", content)
        self.assertIn("*.tsx linguist-detectable=true", content)

if __name__ == "__main__":
    unittest.main()
