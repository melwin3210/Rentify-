"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Search, MapPin, Home, DollarSign } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

export default function SearchSectionI18n() {
  const { t } = useTranslation()
  const [searchData, setSearchData] = useState({
    city: "",
    type: "",
    minPrice: "",
    maxPrice: ""
  })

  const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"]
  const propertyTypes = [
    { value: "apartment", label: t("apartment") },
    { value: "house", label: t("house") },
    { value: "condo", label: t("condo") },
    { value: "studio", label: t("studio") },
    { value: "villa", label: t("villa") }
  ]

  const handleSearch = () => {
    console.log("Search data:", searchData)
  }

  return (
    <section className="py-12 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">{t("searchProperties")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find your perfect rental property with our advanced search filters
          </p>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {t("city")}
                </label>
                <Select value={searchData.city} onValueChange={(value) => setSearchData({...searchData, city: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectCity")} />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  {t("propertyType")}
                </label>
                <Select value={searchData.type} onValueChange={(value) => setSearchData({...searchData, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectType")} />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Min Price
                </label>
                <Input
                  type="number"
                  placeholder="$500"
                  value={searchData.minPrice}
                  onChange={(e) => setSearchData({...searchData, minPrice: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Max Price
                </label>
                <Input
                  type="number"
                  placeholder="$3000"
                  value={searchData.maxPrice}
                  onChange={(e) => setSearchData({...searchData, maxPrice: e.target.value})}
                />
              </div>
            </div>

            <Button onClick={handleSearch} className="w-full md:w-auto">
              <Search className="h-4 w-4 mr-2" />
              {t("search")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}