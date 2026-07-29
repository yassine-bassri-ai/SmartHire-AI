class PostProcessor:

    @staticmethod
    def confidence(probability: float):

        if probability >= 0.90:
            return "Very High"

        if probability >= 0.75:
            return "High"

        if probability >= 0.60:
            return "Medium"

        if probability >= 0.40:
            return "Low"

        return "Very Low"

    @staticmethod
    def recommendation(probability: float):

        if probability >= 0.90:
            return "Excellent Match"

        if probability >= 0.75:
            return "Highly Recommended"

        if probability >= 0.60:
            return "Recommended"

        if probability >= 0.40:
            return "Consider"

        return "Not Recommended"

    @staticmethod
    def score(probability: float):

        return round(probability * 100, 2)