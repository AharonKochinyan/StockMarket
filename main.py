#!/usr/bin/env python3
"""StockMarket — project status report."""


def summarize(components):
    """Print the status of each project component and return the number of unfinished items."""
    not_ready = 0

    for component in components:
        name = component["name"]

        if component["done"]:
            print(f"[✓] {name} - Ready")
        elif component["priority"] == "High":
            print(f"[*] {name} - High_Priority")
            not_ready += 1
        else:
            print(f"[ ] {name} - To Do")
            not_ready += 1

    return not_ready


def main():
    """Display the current status of the StockMarket project."""
    project = "StockMarket"

    components = [
        {"name": "Project Idea & README", "done": True, "priority": "Low"},
        {"name": "Python Script", "done": True, "priority": "Low"},
        {"name": "Stock Data API", "done": False, "priority": "High"},
        {"name": "Database", "done": False, "priority": "Medium"},
        {"name": "Docker Support", "done": False, "priority": "Medium"},
    ]

    print(f"=== {project} Status ===")

    remaining = summarize(components)

    print()

    if remaining == 0:
        print("All project components are ready!")
    elif remaining == 1:
        print("Only 1 component remains to be completed.")
    else:
        print(f"{remaining} components still need to be completed.")

    return remaining


if __name__ == "__main__":
    main()
