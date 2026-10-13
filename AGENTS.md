<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the app in the index route with learning content in a separate data module; no account is needed.
- Speaking scores must come only from real recordings: client checks for voiced audio first, then /api/speech-analyze transcribes and analyzes via AI Gateway; never show a score without recorded speech, so feedback is never faked.
- Use Web Speech synthesis only after user interaction.
- Scope adult and child semantic theme tokens to the phone screen and keep the desktop preview shell independent so mode changes do not recolor the workspace.
- Never render a button or other interactive control inside another button; keep secondary controls as siblings in a flex row, because nested buttons break SSR hydration and make early clicks dead.
