import { User } from '../models/user.model.js';
import { Financial } from '../models/financial.model.js';

export const updateUserFinancialData = async (req, res) => {
  try {
    const { userId } = req.params;
    const financialData = req.body;

    const updatedFinancialData = await Financial.findOneAndUpdate(
      { userId },
      { ...financialData },
      { upsert: true, new: true }
    );

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { financialId: updatedFinancialData._id },
      { new: true }
    ).populate('financialId');

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating financial data:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getFinancialProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate('financialId');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      name: user.name,
      email: user.email,
      financialData: user.financialId
    });
  } catch (error) {
    console.error('Error fetching financial profile:', error);
    res.status(500).json({ message: error.message });
  }
};
