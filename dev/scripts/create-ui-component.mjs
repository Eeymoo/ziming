#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '../..')

const TEMPLATE_DIR = path.join(projectRoot, 'dev/templates/ComponentTemp')
const UI_DIR = path.join(projectRoot, 'ui')

function validateComponentName(name) {
  if (!name) {
    throw new Error('Component name is required')
  }

  if (!/^UI[A-Z]/.test(name)) {
    throw new Error(`Component name must start with "UI" and use PascalCase. Got: ${name}`)
  }

  if (!/^[A-Z][a-zA-Z0-9]*$/.test(name)) {
    throw new Error(`Component name must be PascalCase. Got: ${name}`)
  }

  return true
}

function copyAndReplaceDir(src, dest, componentName) {
  const entries = fs.readdirSync(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destName = entry.name.replace(/ComponentTemp/g, componentName)
    const destPath = path.join(dest, destName)

    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true })
      copyAndReplaceDir(srcPath, destPath, componentName)
    } else {
      let content = fs.readFileSync(srcPath, 'utf8')
      content = content.replace(/ComponentTemp/g, componentName)
      fs.writeFileSync(destPath, content)
    }
  }
}

function createComponent(componentName, dryRun = false) {
  validateComponentName(componentName)

  const destDir = path.join(UI_DIR, componentName)

  if (fs.existsSync(destDir)) {
    throw new Error(`Component ${componentName} already exists at ${destDir}. Will not overwrite.`)
  }

  if (dryRun) {
    const entries = fs.readdirSync(TEMPLATE_DIR, { withFileTypes: true })
    for (const entry of entries) {
      const destName = entry.name.replace(/ComponentTemp/g, componentName)
      console.log(`[dry-run] Would create ui/${componentName}/${destName}`)
    }
    return
  }

  fs.mkdirSync(destDir, { recursive: true })
  copyAndReplaceDir(TEMPLATE_DIR, destDir, componentName)

  const entries = fs.readdirSync(TEMPLATE_DIR, { withFileTypes: true })
  for (const entry of entries) {
    const destName = entry.name.replace(/ComponentTemp/g, componentName)
    console.log(`Created ui/${componentName}/${destName}`)
  }
}

function main() {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.error('Usage: pnpm create:ui <ComponentName> [--dry-run]')
    console.error('Example: pnpm create:ui UIButton')
    process.exit(1)
  }

  const dryRun = args.includes('--dry-run')
  const componentName = args.find(arg => !arg.startsWith('--'))

  if (!componentName) {
    console.error('Component name is required')
    process.exit(1)
  }

  try {
    createComponent(componentName, dryRun)
  } catch (err) {
    console.error(`Error: ${err.message}`)
    process.exit(1)
  }
}

main()