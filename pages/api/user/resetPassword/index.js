import connectDB from "../../../../utils/connectDB";
import DatabaseConnection from "@/utils/DataBaseConnection";
import auth from "../../../../middleware/auth";
import bcrypt from "bcrypt";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await resetPassword(req, res);
      break;
  }
};

const resetPassword = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { password } = req.body;
    const passwordHash = await bcrypt.hash(password, 12);
    const connection = DatabaseConnection.getInstance().getConnection();
    await connection.execute("UPDATE users SET password = ? WHERE id = ?", [
      passwordHash,
      result.id,
    ]);

    // connection.end();
    res.json({ msg: "Update Success!" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
