# Create a GitHub repository

## Goal
Create an empty GitHub repository that the user can import this project's files into.

## Defaults (since details were skipped)
- Repository name: `lovable-project`
- Visibility: public
- No README, .gitignore, or license initially — empty repo so the user can import files cleanly.

## Steps
1. Connect a GitHub workspace connection via the GitHub connector so the app can call the GitHub API on the builder's behalf.
2. Call the GitHub REST API (`POST /user/repos`) to create the public repository named `lovable-project`.
3. Return the repository HTTPS/SSH URL.

## Outcome
The user receives a ready-to-use GitHub repo URL and can proceed to import files and then discuss the project.
