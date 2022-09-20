# search-workflow-action

Action to search for Github Actions workflow runs. Allows to filter results by workflow name. Always return the latest workflow that matches search criterias.

## IO

Input and output variables used by search-workflow-action

### Inputs

- **`owner` Required** repo owner.
- **`repo` Required** repo.
- **`status`** Can be one of: completed, action_required, cancelled, failure, neutral, skipped, stale, success, timed_out, in_progress, queued, requested, waiting.
- **`event`** Returns workflow run triggered by the event you specify. For example, push, pull_request or issue.
- **`name`** Name of the workflow.
- **`GITHUB_AUTH_TOKEN` Required** must have the `actions:read` permission to use this endpoint.

### Outputs

- **`data`** [Workflow run data](https://docs.github.com/en/rest/actions/workflow-runs#list-workflow-runs-for-a-repository).

## Example usage

```yaml
on: [push, pull_request]

jobs:
  test-yaml-reader:
    runs-on: ubuntu-latest
    name: Test search-workflow
    steps:
      - uses: actions/checkout@v1

      - name: Run search-workflow action
        id: search-workflow
        uses: rmakovyak/search-workflow-action@main # You may wish to replace main with a version tag such as '1.6' etc.
        with:
          owner: 'rmakovyak'
          repo: 'search-workflow-action'
          name: 'Test'
          GITHUB_AUTH_TOKEN: 'Personal access token'

      - name: Display search-workflow output
        run: echo "${{ steps.search-workflow.outputs.data.name }}"
```
