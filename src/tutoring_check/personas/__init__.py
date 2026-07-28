"""Offline compilation of literature-grounded student personas (docs/student_personas.md).

`simulation/` depends on `artifact` only - a pure JSON reader - so the session loop never reaches
the compiler and makes no extra model calls at run time.
"""
