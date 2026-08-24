# Show available recipes
default:
    @just --list

# Install dependencies, ensuring workspace links are created
install:
    npm install

# Run the docs site in dev mode
dev:
    npm run dev --workspace=docs

# Build the docs site
build:
    npm run build --workspace=docs

# Preview the built docs site
preview:
    npm run preview --workspace=docs

# Remove all installed dependencies
clean:
    rm -rf node_modules docs/node_modules component-system/node_modules

# Verify that the local component-system workspace is being used
verify:
    test -L node_modules/nibbles-and-bites
    test "$(realpath node_modules/nibbles-and-bites)" = "$(realpath component-system)"
    @echo "Using local component-system workspace"
