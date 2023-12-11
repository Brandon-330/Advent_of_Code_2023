f = File.new('puzzle_8.txt').readlines
instructions = f[0].gsub("\n", '')

nodes_hsh = f[2..].each_with_object({}) do |line, hsh|
  line = line.gsub("\n", '')
  
  key, values = line.split(' = ')
  values_arr = values.gsub(/[()]/, '').split(', ')
  hsh[key] = values_arr
end

idx = 0
current_locations = []
nodes_hsh.keys.each { |location| current_locations << location if location[-1] == 'A' }
4.times { |_| current_locations.delete_at(0) }
current_locations_size = current_locations.size

counter = 0
while idx < instructions.size
  counter += 1
  current_instruction = case instructions[idx]
                        when 'L' then 0
                        when 'R' then 1
                        end

  current_locations.map! { |current_location| nodes_hsh[current_location][current_instruction] }
  
  new_idx = 0
  while new_idx < current_locations_size
    if !current_locations[new_idx].end_with?('Z')
      idx += 1
      idx = 0 if idx == instructions.size
      break
    end

    p current_locations[new_idx]
    new_idx += 1
  end

  break if new_idx == current_locations_size
end

puts counter





# f = File.new('puzzle_8.txt').readlines
# instructions = f[0].gsub("\n", '')

# nodes_hsh = f[2..].each_with_object({}) do |line, hsh|
#   line = line.gsub("\n", '')
  
#   key, values = line.split(' = ')
#   values_arr = values.gsub(/[()]/, '').split(', ')
#   hsh[key] = values_arr
# end

# idx = 0
# current_location = 'ZZZ'
# counter = 0
# while idx < instructions.size
#   counter += 1
#   current_instruction = case instructions[idx]
#                         when 'L' then 0
#                         when 'R' then 1
#                         end

#   current_location = nodes_hsh[current_location][current_instruction]

#   break if current_location.end_with?('Z')

#   idx += 1

#   idx = 0 if idx == instructions.size
# end

# puts counter





# SOLUTION 1

# f = File.new('puzzle_8.txt').readlines
# instructions = f[0].gsub("\n", '')

# nodes_hsh = f[2..].each_with_object({}) do |line, hsh|
#   line = line.gsub("\n", '')
  
#   key, values = line.split(' = ')
#   values_arr = values.gsub(/[()]/, '').split(', ')
#   hsh[key] = values_arr
# end

# idx = 0
# current_location = 'AAA'
# counter = 0
# while idx < instructions.size
#   counter += 1
#   current_instruction = case instructions[idx]
#                         when 'L' then 0
#                         when 'R' then 1
#                         end

#   current_location = nodes_hsh[current_location][current_instruction]

#   break if current_location == 'ZZZ'

#   idx += 1

#   idx = 0 if idx == instructions.size
# end

# puts counter