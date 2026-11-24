SHELL := /bin/bash

.PHONY: help install dev build lint test docker-build docker-run clean

help:
	@echo "Modern React App Management Commands:"
	@echo "  make install      - Install local npm dependencies"
	@echo "  make dev          - Start local Vite development server"
	@echo "  make build        - Compile production TypeScript & Vite bundle"
	@echo "  make test         - Run automated test suite"
	@echo "  make docker-build - Build multi-stage production Docker image"
	@echo "  make docker-run   - Run container locally on http://localhost:8080"
	@echo "  make clean        - Remove build artifacts and node_modules"

install:
	npm install

dev:
	npm run dev

build:
	npm run build

test:
	python3 -m unittest discover -s tests -p "test_*.py"

docker-build:
	docker build -t modern-react-app:latest .

docker-run:
	docker run -p 8080:8080 --rm modern-react-app:latest

clean:
	rm -rf dist node_modules
