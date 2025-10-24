Medichain - Combined frontend + backend (local SQLite)

Structure:
- backend/    -> Flask backend (app.py, medichain.db created on first run)
- frontend/   -> React + Vite frontend (unchanged)

Quick start (backend):
1. cd backend
2. python -m venv venv
3. source venv/bin/activate   (Windows: venv\Scripts\activate)
4. pip install -r requirements.txt
5. python app.py
6. Backend runs at http://127.0.0.1:5000/

Frontend:
- cd frontend, then follow instructions in frontend/README.md (usually: npm install && npm run dev)
- Configure frontend to call API at http://localhost:5000/ if needed.

Notes:
- CORS is enabled for development.
- This package was assembled by ChatGPT to match your uploaded frontend files.
