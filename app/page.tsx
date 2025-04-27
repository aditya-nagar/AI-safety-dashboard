"use client"

import type React from "react"

import { useState } from "react"
import { Shield, AlertTriangle, Info, Plus, ChevronDown, ChevronUp, Filter, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

// Define the incident type
interface Incident {
  id: number
  title: string
  description: string
  severity: "Low" | "Medium" | "High"
  reported_at: string
}

// Initial mock data
const initialIncidents: Incident[] = [
  {
    id: 1,
    title: "Biased Recommendation Algorithm",
    description:
      "Algorithm consistently favored certain demographics in job recommendations, leading to potential discrimination issues. The bias was detected during a routine audit of recommendation patterns across different user groups.",
    severity: "Medium",
    reported_at: "2025-03-15T10:00:00Z",
  },
  {
    id: 2,
    title: "LLM Hallucination in Critical Info",
    description:
      "LLM provided incorrect safety procedure information when queried about emergency protocols. This could have led to dangerous situations if the information had been followed in a real emergency scenario.",
    severity: "High",
    reported_at: "2025-04-01T14:30:00Z",
  },
  {
    id: 3,
    title: "Minor Data Leak via Chatbot",
    description:
      "Chatbot inadvertently exposed non-sensitive user metadata during conversation. While no critical information was compromised, this represents a potential privacy concern that needs addressing.",
    severity: "Low",
    reported_at: "2025-03-20T09:15:00Z",
  },
  {
    id: 4,
    title: "Unexpected Model Behavior in Edge Case",
    description:
      "AI model produced unexpected outputs when presented with certain rare input combinations. The behavior wasn't harmful but indicates a potential blind spot in training data or model architecture.",
    severity: "Medium",
    reported_at: "2025-03-25T16:45:00Z",
  },
]

export default function Home() {
  // State for incidents and their expanded status
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents)
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set())

  // State for filtering and sorting
  const [severityFilter, setSeverityFilter] = useState<string>("All")
  const [sortOrder, setSortOrder] = useState<string>("newest")

  // State for new incident form
  const [showForm, setShowForm] = useState<boolean>(false)
  const [newIncident, setNewIncident] = useState<Omit<Incident, "id" | "reported_at">>({
    title: "",
    description: "",
    severity: "Medium",
  })

  // Toggle expanded state for an incident
  const toggleExpanded = (id: number) => {
    const newExpandedIds = new Set(expandedIds)
    if (newExpandedIds.has(id)) {
      newExpandedIds.delete(id)
    } else {
      newExpandedIds.add(id)
    }
    setExpandedIds(newExpandedIds)
  }

  // Filter incidents by severity
  const filteredIncidents = incidents.filter(
    (incident) => severityFilter === "All" || incident.severity === severityFilter,
  )

  // Sort incidents by date
  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    const dateA = new Date(a.reported_at).getTime()
    const dateB = new Date(b.reported_at).getTime()
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB
  })

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!newIncident.title.trim() || !newIncident.description.trim()) {
      alert("Please fill in all fields")
      return
    }

    // Create new incident
    const incident: Incident = {
      id: Math.max(0, ...incidents.map((i) => i.id)) + 1,
      ...newIncident,
      reported_at: new Date().toISOString(),
    }

    // Add to incidents list
    setIncidents([...incidents, incident])

    // Reset form
    setNewIncident({
      title: "",
      description: "",
      severity: "Medium",
    })

    // Optionally close form
    setShowForm(false)
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Get icon for severity level
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "High":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "Medium":
        return <Shield className="h-4 w-4 text-amber-500" />
      case "Low":
        return <Info className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  // Get color for severity badge
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "Medium":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100"
      case "Low":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      default:
        return ""
    }
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Safety Incident Dashboard</h1>
          <p className="text-muted-foreground mt-1">Monitor and report AI safety incidents across the organization</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="mt-4 md:mt-0"
          variant={showForm ? "secondary" : "default"}
        >
          {showForm ? "Cancel" : "Report New Incident"}
          {!showForm && <Plus className="ml-2 h-4 w-4" />}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Report New AI Safety Incident</CardTitle>
            <CardDescription>Provide details about the incident for review and tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Incident Title</Label>
                <Input
                  id="title"
                  value={newIncident.title}
                  onChange={(e) => setNewIncident({ ...newIncident, title: e.target.value })}
                  placeholder="Enter a descriptive title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newIncident.description}
                  onChange={(e) => setNewIncident({ ...newIncident, description: e.target.value })}
                  placeholder="Provide detailed information about what happened"
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="severity">Severity Level</Label>
                <Select
                  value={newIncident.severity}
                  onValueChange={(value) =>
                    setNewIncident({
                      ...newIncident,
                      severity: value as "Low" | "Medium" | "High",
                    })
                  }
                >
                  <SelectTrigger id="severity">
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full">
                Submit Incident Report
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filter by:</span>
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Severities</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Sort by:</span>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {sortedIncidents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No incidents match your filter criteria</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedIncidents.map((incident) => (
            <Card key={incident.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">{incident.title}</CardTitle>
                    <CardDescription>Reported on {formatDate(incident.reported_at)}</CardDescription>
                  </div>
                  <Badge className={getSeverityColor(incident.severity)}>
                    {getSeverityIcon(incident.severity)}
                    <span className="ml-1">{incident.severity}</span>
                  </Badge>
                </div>
              </CardHeader>

              {expandedIds.has(incident.id) && (
                <CardContent className="pt-0 pb-3">
                  <div className="bg-muted/50 p-3 rounded-md">
                    <h4 className="text-sm font-medium mb-2">Incident Description:</h4>
                    <p className="text-sm text-muted-foreground">{incident.description}</p>
                  </div>
                </CardContent>
              )}

              <CardFooter className="flex justify-end py-2 px-6 bg-muted/30">
                <Button variant="ghost" size="sm" onClick={() => toggleExpanded(incident.id)} className="text-xs">
                  {expandedIds.has(incident.id) ? (
                    <>
                      Hide Details
                      <ChevronUp className="ml-1 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      View Details
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-6 text-center text-sm text-muted-foreground">
        Showing {sortedIncidents.length} of {incidents.length} incidents
        {severityFilter !== "All" && ` (filtered by ${severityFilter} severity)`}
      </div>
    </main>
  )
}
