# Returns a datastructure representing the program

# iterate over session_rows
#   capture last_start
#   if current start different to last_start
#



module Jekyll
  module ProgramTable
    def program_table(input)
      if input.nil?
        return Array.new()
      end
      times = Array.new()
      events_table = Array.new()
      row = Array.new()
      for session_row in input do
        start_time = session_row["start"].literal
        end_time = session_row["end"].literal
        order = session_row.key?("order") ? session_row["order"].literal : nil

        if times.length == 0 or times[-1] != start_time then
          if times.length > 0 then
            # row_break
            # Add last row to events_table
            events_table = Array(events_table).push(row)
            row = Array.new()
          end
          times = Array(times).push(start_time)
        end

        session_hash = { "resource" => session_row["session"], "order" => order, "start" => start_time, "end" => end_time }
        row = Array(row).push(session_hash)
      end
      # Add last row to events_table
      events_table = Array(events_table).push(row)

      for events_row in events_table do
        for event in events_row do
          start_index = times.find_index(event["start"])
          end_index = start_index + 1
          for end_time in times.drop(start_index) do
            # TODO maybe convert to dates before
            if event["end"] <= end_time then
              end_index = times.find_index(end_time)
              break
            end
          end
          event["rowspan"] = end_index - start_index
        end
      end
      return events_table
    end
  end
end

Liquid::Template.register_filter(Jekyll::ProgramTable)
