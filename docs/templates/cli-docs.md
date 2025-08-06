# CLI Command Documentation Template Implementation Plan

## Overview

This plan outlines the creation of a standardized template for documenting CLI commands in the Replicated documentation. The template will ensure consistency across all CLI command documentation while following the established style guide principles.

## Template Structure

### 1. File Naming Convention
- **Pattern**: `{cli-name}-{command-name}.md` or `{cli-name}-{command-name}.mdx`
- **Examples**: 
  - `kots-cli-download.md`
  - `replicated-cli-app-create.mdx`
  - `embedded-cluster-install.mdx`

### 2. Template Sections

#### Header Section
- **Command Name**: Use the actual command name as the H1 heading
- **Brief Description**: One-sentence description of what the command does
- **Context/Prerequisites**: When applicable, mention requirements or context

#### Usage Section
- **Syntax**: Show the exact command syntax with placeholders
- **Parameter Explanations**: Brief explanations of required parameters
- **Global Flags Reference**: Link to global flags when applicable

#### Flags/Options Section
- **Table Format**: Use consistent table structure for flags
- **Column Headers**: Flag, Type, Description
- **Flag Formatting**: Use backticks around flag names
- **Descriptions**: Clear, concise descriptions following style guide
- **Defaults**: Include default values when applicable
- **Requirements**: Note version requirements or limitations

#### Examples Section
- **Multiple Use Cases**: Provide practical examples for different scenarios
- **Real Commands**: Use realistic parameter values
- **Comments**: Include explanatory comments when helpful
- **Progressive Complexity**: Start simple, then show advanced usage

#### Optional Sections
- **Prerequisites**: When specific setup is required
- **Related Commands**: Links to related CLI commands
- **Troubleshooting**: Common issues and solutions
- **See Also**: Cross-references to related documentation

## Style Guide Adherence

### Content Guidelines
- **Active Voice**: Use active voice throughout
- **Second Person**: Address the reader as "you"
- **No Marketing Language**: Avoid "simply," "easily," etc.
- **Timeless Language**: Avoid "currently," "new," "now"
- **Concise Descriptions**: Keep descriptions clear and brief

### Formatting Standards
- **UI Elements**: Bold formatting for UI elements
- **Code Elements**: Backticks for commands, flags, and code
- **Tables**: Use HTML tables for complex flag documentation
- **Lists**: Use bulleted lists for parameter explanations
- **Cross-references**: Follow established linking format

### Technical Writing Standards
- **Placeholder Text**: Use ALL_CAPS with underscores
- **Parameter Explanations**: Use "Replace X with Y" format
- **Version Requirements**: Clearly note version dependencies
- **Limitations**: Document known limitations prominently

## Template File Creation

### Location
- **Primary Location**: `/docs/templates/cli-command.md`
- **Alternative**: Consider both `.md` and `.mdx` versions if needed

### Template Content Structure
```markdown
# [COMMAND_NAME]

[Brief description of what the command does and its primary purpose.]

## Usage

```bash
[CLI_NAME] [COMMAND_NAME] [REQUIRED_ARGS] [flags]
```

* Replace `[REQUIRED_ARGS]` with [description]
* Provide `[flags]` according to the table below

[Optional: Link to global flags if applicable]

## Flags

| Flag | Type | Description |
|:-----|------|-------------|
| `--flag-name` | string | [Description with default if applicable] |
| `-h, --help` | | help for [command] |

## Examples

### [Use Case 1]
```bash
[example command]
```

### [Use Case 2]
```bash
[example command with explanation]
```

## Prerequisites
[If applicable - specific requirements before using this command]

## Related Commands
[If applicable - links to related CLI commands]

## See Also
[If applicable - cross-references to related documentation]
```

## Implementation Steps

### Phase 1: Template Creation
1. **Create Base Template**: Develop the standard CLI command template file
2. **Style Guide Integration**: Ensure all elements follow established guidelines
3. **Comment Guidelines**: Add comprehensive comments for template users
4. **Validation**: Review against existing CLI documentation for consistency

### Phase 2: Documentation Standards
1. **Writing Guidelines**: Create specific guidelines for CLI command documentation
2. **Flag Documentation Standards**: Establish consistent flag description patterns
3. **Example Standards**: Define requirements for example quality and coverage
4. **Cross-reference Standards**: Establish linking patterns for CLI commands

### Phase 3: Template Variants
1. **Simple Command Template**: For commands with minimal flags
2. **Complex Command Template**: For commands with extensive options
3. **Command Group Template**: For documenting command groups/subcommands
4. **Legacy Command Template**: For deprecated or legacy commands

### Phase 4: Integration and Training
1. **Template Documentation**: Create documentation on how to use the template
2. **Best Practices Guide**: Develop best practices for CLI documentation
3. **Review Checklist**: Create checklist for CLI command documentation reviews
4. **Style Guide Updates**: Update main style guide with CLI-specific guidance

## Quality Assurance

### Content Review Criteria
- **Accuracy**: Command syntax and flag descriptions are correct
- **Completeness**: All flags and options are documented
- **Clarity**: Descriptions are clear and unambiguous
- **Consistency**: Formatting and style match template standards
- **Examples**: Practical, realistic examples are provided

### Technical Review Criteria
- **Syntax Validation**: Command syntax is accurate
- **Version Compatibility**: Version requirements are clearly noted
- **Link Validation**: All cross-references work correctly
- **Accessibility**: Content follows accessibility guidelines

## Future Considerations

### Maintenance
- **Version Updates**: Process for updating commands when CLI tools change
- **Deprecation Handling**: Strategy for documenting deprecated commands
- **Cross-CLI Consistency**: Ensuring consistency across different CLI tools

### Enhancement Opportunities
- **Interactive Examples**: Consider adding interactive command examples
- **Command Comparison**: Templates for comparing similar commands
- **Troubleshooting Integration**: Built-in troubleshooting sections
- **Auto-generation**: Future automation of CLI documentation generation

## Success Metrics

### Consistency Metrics
- All CLI commands follow the same structure
- Flag documentation uses consistent formatting
- Examples follow established patterns

### Quality Metrics
- Reduced documentation review time
- Fewer clarification questions from users
- Improved user task completion rates

### Maintenance Metrics
- Faster documentation updates for CLI changes
- Reduced effort for new CLI command documentation
- Consistent cross-references and linking
