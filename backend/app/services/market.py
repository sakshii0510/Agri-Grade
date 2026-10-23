
from typing import Any

import httpx

from app.core.config import settings


MARKET_API_URL = (
    "https://api.data.gov.in/resource/"
    "9ef84268-d588-465a-a308-a864a43d0070"
)


class MarketService:
    def __init__(self) -> None:
        self.api_key = settings.market_api_key

    async def get_market_prices(
        self,
        crop: str,
        state: str = "",
        limit: int = 20,
    ) -> dict[str, Any]:
        """Fetch daily mandi prices from India's government data API."""

        crop = crop.strip()
        state = state.strip()

        if not crop:
            raise ValueError("Crop name is required.")

        if not 1 <= limit <= 100:
            raise ValueError("Limit must be between 1 and 100.")

        if not self.api_key:
            return {
                "success": False,
                "available": False,
                "message": "Government market API key is not configured.",
                "crop": crop,
            }

        params = {
            "api-key": self.api_key,
            "format": "json",
            "limit": limit,
            "filters[commodity]": crop,
        }

        if state:
            params["filters[state]"] = state

        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.get(
                    MARKET_API_URL,
                    params=params,
                )

            if response.status_code in (401, 403):
                return {
                    "success": False,
                    "available": False,
                    "message": "Market API key is invalid or unauthorized.",
                    "crop": crop,
                }

            response.raise_for_status()
            data = response.json()

            records = data.get("records", [])

            return {
                "success": True,
                "available": True,
                "crop": crop,
                "state": state or None,
                "total_records": data.get("total", len(records)),
                "prices": [
                    {
                        "state": item.get("state"),
                        "district": item.get("district"),
                        "market": item.get("market"),
                        "commodity": item.get("commodity"),
                        "variety": item.get("variety"),
                        "arrival_date": item.get("arrival_date"),
                        "min_price": item.get("min_price"),
                        "max_price": item.get("max_price"),
                        "modal_price": item.get("modal_price"),
                    }
                    for item in records
                ],
                "price_unit": "INR per quintal.",
                "source": "Government of India Open Government Data",
            }

        except httpx.TimeoutException:
            return {
                "success": False,
                "available": False,
                "message": "Market API request timed out.",
                "crop": crop,
            }

        except httpx.HTTPStatusError:
            return {
                "success": False,
                "available": False,
                "message": "Market API returned an HTTP error.",
                "crop": crop,
            }

        except httpx.RequestError:
            return {
                "success": False,
                "available": False,
                "message": "Unable to connect to the market API.",
                "crop": crop,
            }

        except ValueError:
            return {
                "success": False,
                "available": False,
                "message": "Market API returned invalid JSON.",
                "crop": crop,
            }


market_service = MarketService()
